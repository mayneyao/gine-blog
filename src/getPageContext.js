/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss'
import {
    createGenerateClassName,
    createMuiTheme,
} from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import teal from '@material-ui/core/colors/teal'

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
    palette: {
        secondary: {
            light: red[300],
            main: red[500],
            dark: red[700],
        },
        primary: {
            light: teal[300],
            main: teal[500],
            dark: teal[700],
        },
    },
    typography: {
        useNextVariants: true,
    },
})

function createPageContext () {
    return {
        theme,
        // This is needed in order to deduplicate the injection of CSS in the page.
        sheetsManager: new Map(),
        // This is needed in order to inject the critical CSS.
        sheetsRegistry: new SheetsRegistry(),
        // The standard class name generator.
        generateClassName: createGenerateClassName(),
    }
}

export default function getPageContext () {
    // Make sure to create a new context for every server-side request so that data
    // isn't shared between connections (which would be bad).
    if (!process.browser) {
        return createPageContext()
    }

    // Reuse context on the client-side.
    if (!global.__INIT_MATERIAL_UI__) {
        global.__INIT_MATERIAL_UI__ = createPageContext()
    }

    return global.__INIT_MATERIAL_UI__
}
