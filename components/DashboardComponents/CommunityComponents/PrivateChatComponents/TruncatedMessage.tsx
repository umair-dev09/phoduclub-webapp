import React, { useState, useEffect } from 'react';

interface TruncatedMessageProps {
    message: string | React.ReactNode[];
}

const TruncatedMessage = ({ message }: TruncatedMessageProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Reset expansion state when message changes
    useEffect(() => {
        setIsExpanded(false);
    }, [message]);

    if (!message) return null;

    // If message is already a ReactNode array, we need to handle it differently
    if (Array.isArray(message)) {
        return <div>{message}</div>;
    }

    const words = message.split(' ');
    const shouldTruncate = words.length > 30;

    const displayText = shouldTruncate && !isExpanded
        ? words.slice(0, 30).join(' ') + '...'
        : message;

    return (
        <div className="break-all">
            {displayText}
            {shouldTruncate && !isExpanded && (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="ml-2 text-xs font-medium text-[#973AFF] hover:text-[#7400E0] transition-colors"
                >
                    View more
                </button>
            )}
        </div>
    );
};

export default TruncatedMessage;