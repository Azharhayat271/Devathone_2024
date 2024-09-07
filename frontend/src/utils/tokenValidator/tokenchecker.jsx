import { useEffect } from 'react';

const useLocalStorageWatcher = (key, callback) => {
    useEffect(() => {
        const handleStorageChange = (event) => {
            // Check if the event's key matches and the new value is null or undefined
            if (event.key === key && !event.newValue) {
                callback();
            }
        };

        // Add the event listener
        window.addEventListener('storage', handleStorageChange);

        // Clean up the event listener
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key, callback]);
};

export default useLocalStorageWatcher;
