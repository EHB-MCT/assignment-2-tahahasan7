import React from "react";
import { cn } from "../../utils/cn";

/**
 * Card component that serves as a wrapper for content.
 * It is a container with padding, rounded corners, and a shadow effect.
 *
 * @component
 * @param {React.ReactNode} children - The content inside the card.
 * @param {string} [className] - Optional additional class names to customize the card's appearance.
 * @returns {JSX.Element} A styled card component.
 */
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn("bg-white rounded-lg shadow-md overflow-hidden", className)}
    >
      {children}
    </div>
  );
}

/**
 * CardHeader component that represents the top section of the card.
 * Typically used for titles or headings.
 *
 * @component
 * @param {React.ReactNode} children - The content inside the header.
 * @param {string} [className] - Optional additional class names to customize the header's appearance.
 * @returns {JSX.Element} A styled header section for the card.
 */
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("px-6 py-4 border-b border-gray-200", className)}>
      {children}
    </div>
  );
}

/**
 * CardContent component that represents the main body section of the card.
 * It is used for placing the primary content or information inside the card.
 *
 * @component
 * @param {React.ReactNode} children - The content inside the main body of the card.
 * @param {string} [className] - Optional additional class names to customize the content's appearance.
 * @returns {JSX.Element} A styled content section for the card.
 */
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
}

/**
 * CardFooter component that represents the bottom section of the card.
 * Typically used for actions, links, or additional information.
 *
 * @component
 * @param {React.ReactNode} children - The content inside the footer.
 * @param {string} [className] - Optional additional class names to customize the footer's appearance.
 * @returns {JSX.Element} A styled footer section for the card.
 */
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("px-6 py-4 border-t border-gray-200", className)}>
      {children}
    </div>
  );
}
