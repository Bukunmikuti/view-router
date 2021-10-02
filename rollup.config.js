import { terser } from "rollup-plugin-terser";
import styles from "rollup-plugin-styles";

export default {
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
    

}