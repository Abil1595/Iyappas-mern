import React from 'react';

const ExternalScripts = () => {
    React.useEffect(() => {
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js';
        bootstrapScript.async = true;
        document.body.appendChild(bootstrapScript);

        const popperScript = document.createElement('script');
        popperScript.src = 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js';
        popperScript.async = true;
        document.body.appendChild(popperScript);

        const ioniconsModule = document.createElement('script');
        ioniconsModule.type = 'module';
        ioniconsModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
        document.body.appendChild(ioniconsModule);

        const ioniconsNoModule = document.createElement('script');
        ioniconsNoModule.noModule = true;
        ioniconsNoModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
        document.body.appendChild(ioniconsNoModule);

        return () => {
            // Cleanup the scripts if needed
            document.body.removeChild(bootstrapScript);
            document.body.removeChild(popperScript);
            document.body.removeChild(ioniconsModule);
            document.body.removeChild(ioniconsNoModule);
        };
    }, []);

    return null;
};

export default ExternalScripts;
