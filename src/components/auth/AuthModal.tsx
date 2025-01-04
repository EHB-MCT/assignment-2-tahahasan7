import { useState } from "react";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isLogin ? "Login" : "Register"}
    >
      <div className="mb-6">
        <div className="flex gap-4 mb-6">
          <Button
            variant={isLogin ? "primary" : "ghost"}
            onClick={() => setIsLogin(true)}
            className="flex-1"
          >
            Login
          </Button>
          <Button
            variant={!isLogin ? "primary" : "ghost"}
            onClick={() => setIsLogin(false)}
            className="flex-1"
          >
            Register
          </Button>
        </div>

        {isLogin ? (
          <LoginForm onClose={onClose} />
        ) : (
          <RegisterForm onClose={onClose} />
        )}
      </div>
    </Modal>
  );
}
