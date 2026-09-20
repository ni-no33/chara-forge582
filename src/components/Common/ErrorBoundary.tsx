import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, RotateCcw } from 'lucide-react';
import { DEFAULT_SAMPLE_CHARACTER, saveCharacters, setActiveCharacterId } from '../../utils/storage';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleFactoryReset = () => {
    if (confirm('ローカルのキャラクターキャッシュを初期サンプルに復元しますか？（現在の編集データはリセットされます）')) {
      saveCharacters([DEFAULT_SAMPLE_CHARACTER]);
      setActiveCharacterId(DEFAULT_SAMPLE_CHARACTER.id);
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[300px] p-6 m-4 bg-[#141824] border border-red-800/60 rounded-xl text-slate-200 flex flex-col items-center justify-center text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-700/60 flex items-center justify-center text-red-400">
            <AlertTriangle size={24} />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-red-300">
              {this.props.fallbackTitle || '画面の表示中にエラーが発生しました'}
            </h3>
            <p className="text-xs text-slate-400 max-w-md">
              ブラウザの自動翻訳やキャッシュの不整合が原因の可能性があります。以下のボタンから復旧してください。
            </p>
          </div>

          {this.state.error && (
            <div className="bg-[#0b0f17] p-3 rounded-lg border border-[#252e3d] text-[11px] font-mono text-red-400 max-w-lg overflow-x-auto text-left">
              {this.state.error.toString()}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={this.handleReset}
              className="px-4 py-2 bg-[#252e3d] hover:bg-[#303b4d] text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <RefreshCw size={14} />
              <span>画面を再読み込み</span>
            </button>
            <button
              type="button"
              onClick={this.handleFactoryReset}
              className="px-4 py-2 bg-red-900/40 hover:bg-red-900/60 text-red-200 border border-red-700/50 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <RotateCcw size={14} />
              <span>初期サンプルで復元</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}