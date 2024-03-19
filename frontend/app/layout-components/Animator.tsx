"use client";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import '../transition.css';
/**
 * @author Louis Figes
 * animates page transitions
 */

export default function Animator({ children }: { children: React.ReactNode }) {

  return (
    <TransitionGroup>
    <CSSTransition classNames="slide" timeout={300}>
        {children}
    </CSSTransition>
    </TransitionGroup>
  );
}   