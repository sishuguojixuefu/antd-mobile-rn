import React from 'react';
import Portal from '../portal';
import AlertContainer from './AlertContainer';
import { Action, CallbackOnBackHandler } from './PropsType';

export default function a(
  title: React.ReactNode,
  content: React.ReactNode,
  actions: Action[] = [{ text: '确定' }],
  onBackHandler?: CallbackOnBackHandler,
  onMaskClose?: () => any// 蒙层关闭时的回调
) {
  const key = Portal.add(
    <AlertContainer
      title={title}
      content={content}
      actions={actions}
      onAnimationEnd={(visible: boolean) => {
        if (!visible) {
          Portal.remove(key);
        }
      }}
      onMaskClose={onMaskClose}
      onBackHandler={onBackHandler}
    />,
  );
}
