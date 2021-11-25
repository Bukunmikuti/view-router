import { terser } from "rollup-plugin-terser";
import styles from "rollup-plugin-styles";

export default {
    input: './src/index.js',
    plugins: [styles({mode: ["extract", "./dist/css/viewrouter.css"]})],
    //plugins: [styles()],
    output: [
        {
            file: './dist/core/viewrouter.core.esm.js',
            format: 'es',
        },
        {
            file: './dist/core/viewrouter.core.esm.min.js',
            format: 'es',
            plugins: [terser()]
        },
        {
            file: './dist/core/viewrouter.core.min.js',
            format: "umd",
            name: "ViewRouter", //name of the global object
            plugins: [terser()]
        },
        /* {
            file: './dist/default/viewrouter.esm.js',
            format: 'es',
        },
        {
            file: './dist/default/viewrouter.esm.min.js',
            format: 'es',
            plugins: [terser()]
        },
        {
            file: './dist/default/viewrouter.min.js',
            format: "umd",
            name: "ViewRouter", //name of the global object
            plugins: [terser()]
        } */
    ],
    

}
/* export default {
    input: './src/index.js',
    plugins: [styles()],
    output: [
        {
            file: './dist/esm/viewrouter.es.js',
            format: 'es',
        },
        {
            file: './dist/esm/viewrouter.es.min.js',
            format: 'es',
            plugins: [terser()]
        },
        {
            file: './dist/umd/viewrouter.min.js',
            format: "umd",
            name: "ViewRouter", //name of the global object
            sourcemap: true,
            plugins: [terser()]
        }
    ],
    

} */