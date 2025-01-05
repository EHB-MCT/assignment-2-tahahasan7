import { useState } from "react";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

/**
 * Props for the AuthModal component.
 *
 * @typedef {Object} AuthModalProps
 * @property {boolean} isOpen - Boolean that determines whether the modal is open.
 * @property {Function} onClose - Callback function that will be triggered when the modal is closed.
 */
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * AuthModal component that toggles between Login and Register forms within a modal.
 * It allows users to either log in or register for an account.
 *
 * @component
 * @param {AuthModalProps} props - The properties passed to the component.
 * @param {boolean} props.isOpen - Boolean value that determines whether the modal is visible or not.
 * @param {Function} props.onClose - Function that closes the modal when triggered.
 * @returns {JSX.Element} The rendered AuthModal component.
 */
export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  // State to toggle between login and registration forms
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isLogin ? "Login" : "Register"}
    >
      <div className="mb-6">
        <div className="flex gap-4 mb-6">
          {/* Button to switch to Login form */}
          <Button
            variant={isLogin ? "primary" : "ghost"}
            onClick={() => setIsLogin(true)}
            className="flex-1"
          >
            Login
          </Button>

          {/* Button to switch to Register form */}
          <Button
            variant={!isLogin ? "primary" : "ghost"}
            onClick={() => setIsLogin(false)}
            className="flex-1"
          >
            Register
          </Button>
        </div>

        {/* Conditionally render the Login or Register form */}
        {isLogin ? (
          <LoginForm onClose={onClose} />
        ) : (
          <RegisterForm onClose={onClose} />
        )}
      </div>
    </Modal>
  );
}
