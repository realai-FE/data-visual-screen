import React, { Fragment } from 'react';

// 错误边界无法捕获以下场景中产生的错误：
// 事件处理
// 异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
// 服务端渲染
// 它自身抛出来的错误（并非它的子组件）
class ErrorBoundary extends React.Component<any> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  static getDerivedStateFromProps(nextProps: any, state: any) {
    if (state.children !== nextProps.children) {
      return {
        children: nextProps.children,
        hasError: false,
        error: undefined,
      };
    }
    return null;
  }

  state: {
    hasError: boolean;
    error?: Error;
  } = {
    hasError: false,
  };

  renderError = (e: Error) => {
    const { errorTemplate } = this.props;
    return errorTemplate && typeof errorTemplate === 'function' ? (
      errorTemplate(e)
    ) : (
      <h5>组件出错了，请核查后重试： {e.message}</h5>
    );
  };

  render() {
    if (this.state.hasError) {
      return this.renderError(this.state.error!);
    }
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default ErrorBoundary;
