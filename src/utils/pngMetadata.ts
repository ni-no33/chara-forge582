/**
 * Pure JavaScript PNG metadata reader/writer for SillyTavern V2 Spec
 * Embeds and extracts "chara" base64 JSON payload in PNG tEXt chunk.
 */

// CRC32 table
const crcTable: number[] = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) {
      c = 0xedb88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[n] = c;
}

function crc32(buf: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/**
 * Extract SillyTavern Character data (base64 JSON) from PNG buffer
 */
export function extractTavernCardFromPng(arrayBuffer: ArrayBuffer): any | null {
  const bytes = new Uint8Array(arrayBuffer);
  // Check PNG signature
  if (
    bytes[0] !== 0x89 ||
    bytes[1] !== 0x50 ||
    bytes[2] !== 0x4e ||
    bytes[3] !== 0x47 ||
    bytes[4] !== 0x0d ||
    bytes[5] !== 0x0a ||
    bytes[6] !== 0x1a ||
    bytes[7] !== 0x0a
  ) {
    return null;
  }

  let offset = 8;
  const view = new DataView(arrayBuffer);
  const decoder = new TextDecoder('utf-8');

  while (offset < bytes.length) {
    if (offset + 8 > bytes.length) break;
    const length = view.getUint32(offset, false);
    const type = decoder.decode(bytes.subarray(offset + 4, offset + 8));

    if (type === 'tEXt') {
      const chunkData = bytes.subarray(offset + 8, offset + 8 + length);
      // find null separator
      let nullIndex = -1;
      for (let i = 0; i < chunkData.length; i++) {
        if (chunkData[i] === 0) {
          nullIndex = i;
          break;
        }
      }

      if (nullIndex !== -1) {
        const keyword = decoder.decode(chunkData.subarray(0, nullIndex));
        if (keyword === 'chara') {
          const textData = decoder.decode(chunkData.subarray(nullIndex + 1));
          try {
            // decode base64
            const jsonStr = decodeURIComponent(escape(atob(textData)));
            return JSON.parse(jsonStr);
          } catch (e) {
            console.error('Failed to parse Tavern JSON from base64:', e);
            try {
              return JSON.parse(atob(textData));
            } catch (err) {
              return null;
            }
          }
        }
      }
    }

    offset += 12 + length; // 4 (length) + 4 (type) + length + 4 (crc)
  }

  return null;
}

/**
 * Embed SillyTavern JSON into a PNG ArrayBuffer by adding/updating a tEXt chunk
 */
export function embedTavernCardIntoPng(pngArrayBuffer: ArrayBuffer, tavernJson: any): Uint8Array {
  const srcBytes = new Uint8Array(pngArrayBuffer);
  const encoder = new TextEncoder();

  const jsonString = JSON.stringify(tavernJson);
  // safe base64 encode UTF-8
  const base64Data = btoa(unescape(encodeURIComponent(jsonString)));

  const keyword = 'chara';
  const keywordBytes = encoder.encode(keyword);
  const textBytes = encoder.encode(base64Data);

  // Chunk data: keyword + 0x00 + base64 text
  const chunkData = new Uint8Array(keywordBytes.length + 1 + textBytes.length);
  chunkData.set(keywordBytes, 0);
  chunkData[keywordBytes.length] = 0; // null separator
  chunkData.set(textBytes, keywordBytes.length + 1);

  // Type: 'tEXt'
  const typeBytes = encoder.encode('tEXt');

  // Compute CRC over Type + Data
  const crcInput = new Uint8Array(typeBytes.length + chunkData.length);
  crcInput.set(typeBytes, 0);
  crcInput.set(chunkData, typeBytes.length);
  const chunkCrc = crc32(crcInput);

  // Chunk total size: 4 (length) + 4 (type) + chunkData.length + 4 (crc)
  const newChunk = new Uint8Array(12 + chunkData.length);
  const newChunkView = new DataView(newChunk.buffer);
  newChunkView.setUint32(0, chunkData.length, false);
  newChunk.set(typeBytes, 4);
  newChunk.set(chunkData, 8);
  newChunkView.setUint32(8 + chunkData.length, chunkCrc, false);

  // Insert after IHDR chunk (standard position). IHDR is usually bytes 8..33
  // 8 bytes signature + 4 len + 4 type + 13 data + 4 crc = 33
  const insertPos = 33;
  const result = new Uint8Array(srcBytes.length + newChunk.length);
  result.set(srcBytes.subarray(0, insertPos), 0);
  result.set(newChunk, insertPos);
  result.set(srcBytes.subarray(insertPos), insertPos + newChunk.length);

  return result;
}

/**
 * Generate a 400x600 fallback PNG card on an HTML5 canvas if no user avatar is provided
 */
export function generateDefaultCanvasPng(charName: string, title: string): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve(new ArrayBuffer(0));
      return;
    }

    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, 0, 600);
    grad.addColorStop(0, '#0b0f17');
    grad.addColorStop(0.5, '#162233');
    grad.addColorStop(1, '#0b0f17');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 400, 600);

    // Frame
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, 368, 568);

    // Top text
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('CHARAFORGE // CLASSIFIED CARD', 200, 50);

    // Center icon/box
    ctx.strokeStyle = '#1f2c3f';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 90, 300, 340);
    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 64px sans-serif';
    ctx.fillText('◈', 200, 280);

    // Name & Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(charName || 'Character', 200, 480);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.fillText(title || 'CharaForge Record', 200, 515);

    // Footer
    ctx.fillStyle = '#64748b';
    ctx.font = '11px monospace';
    ctx.fillText('SillyTavern Character Card V2 Ready', 200, 560);

    canvas.toBlob((blob) => {
      if (blob) {
        blob.arrayBuffer().then(resolve);
      } else {
        resolve(new ArrayBuffer(0));
      }
    }, 'image/png');
  });
}
