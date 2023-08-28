import { useEffect } from 'react';

const usePageVisibility = () => {
    useEffect(() => {
        const handleVisibilityChange = () => {
            const isVisible = document.visibilityState === 'visible';
            if (!isVisible) {
                document.title = "Come back! 😢";
            } else {
                document.title = "TrakEx: Expense Tracker";
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);
};

export default usePageVisibility;