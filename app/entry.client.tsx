import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from 'react-dom/client';
import * as React from "react";

requestIdleCallback(() => {
    React.startTransition(() => {
        hydrateRoot(document, 
            <React.StrictMode>
                <RemixBrowser />
                </React.StrictMode>
        );
    });
});
