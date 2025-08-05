import React from "react";
import { AlertCircle, RefreshCw, Wifi, Server, Search } from "lucide-react";
import { ErrorMessageProps, EmptyStateProps } from "@/types";

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  type = "error",
  message = "Something went wrong",
  description = "",
  onRetry = null,
  retryText = "Try Again",
  showIcon = true,
  className = "",
}) => {
  const getErrorConfig = () => {
    switch (type) {
      case "network":
        return {
          icon: Wifi,
          title: "Network Error",
          defaultMessage: "Unable to connect to the internet",
          defaultDescription:
            "Please check your internet connection and try again.",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          iconColor: "text-orange-500",
          textColor: "text-orange-800",
        };
      case "server":
        return {
          icon: Server,
          title: "Server Error",
          defaultMessage: "Server is temporarily unavailable",
          defaultDescription:
            "Our servers are experiencing issues. Please try again in a few minutes.",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          iconColor: "text-red-500",
          textColor: "text-red-800",
        };
      case "search":
        return {
          icon: Search,
          title: "Search Error",
          defaultMessage: "Unable to perform search",
          defaultDescription:
            "There was an issue with your search request. Please try again.",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          iconColor: "text-blue-500",
          textColor: "text-blue-800",
        };
      case "warning":
        return {
          icon: AlertCircle,
          title: "Warning",
          defaultMessage: "Something needs attention",
          defaultDescription: "Please review the information and try again.",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          iconColor: "text-yellow-500",
          textColor: "text-yellow-800",
        };
      default:
        return {
          icon: AlertCircle,
          title: "Error",
          defaultMessage: "Something went wrong",
          defaultDescription: "An unexpected error occurred. Please try again.",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          iconColor: "text-red-500",
          textColor: "text-red-800",
        };
    }
  };

  const config = getErrorConfig();
  const IconComponent = config.icon;
  const displayMessage = message || config.defaultMessage;
  const displayDescription = description || config.defaultDescription;

  return (
    <div
      className={`rounded-lg border p-4 ${config.bgColor} ${config.borderColor} ${className}`}
    >
      <div className="flex items-start space-x-3">
        {showIcon && (
          <IconComponent
            className={`h-5 w-5 ${config.iconColor} flex-shrink-0 mt-0.5`}
          />
        )}
        <div className="flex-1">
          <h3 className={`text-sm font-medium ${config.textColor}`}>
            {displayMessage}
          </h3>
          {displayDescription && (
            <p className={`mt-1 text-sm ${config.textColor} opacity-90`}>
              {displayDescription}
            </p>
          )}
          {onRetry && (
            <div className="mt-3">
              <button
                onClick={onRetry}
                className={`inline-flex items-center space-x-2 text-sm font-medium ${config.textColor} hover:opacity-80 transition-opacity`}
              >
                <RefreshCw className="h-4 w-4" />
                <span>{retryText}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Specialized error components
export const NetworkError: React.FC<Omit<ErrorMessageProps, "type">> = ({
  onRetry,
  ...props
}) => <ErrorMessage type="network" onRetry={onRetry} {...props} />;

export const ServerError: React.FC<Omit<ErrorMessageProps, "type">> = ({
  onRetry,
  ...props
}) => <ErrorMessage type="server" onRetry={onRetry} {...props} />;

export const SearchError: React.FC<Omit<ErrorMessageProps, "type">> = ({
  onRetry,
  ...props
}) => <ErrorMessage type="search" onRetry={onRetry} {...props} />;

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No results found",
  description = "Try adjusting your search criteria or check back later.",
  icon: IconComponent = Search,
  action = null,
  className = "",
}) => (
  <div className={`text-center py-12 ${className}`}>
    <IconComponent className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 mb-4">{description}</p>
    {action}
  </div>
);

export default ErrorMessage;
