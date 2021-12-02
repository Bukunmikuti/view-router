import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss'

export default {
    input: './src/index.js',
    plugins: [
        postcss({
            extract: 'css/viewrouter.slim.min.css',
            minimize: true
        })
    ],
    output: [
        {
            file: './dist/viewrouter.esm.js',
            format: 'es',
        },
        {
            file: './dist/viewrouter.esm.min.js',
            format: 'es',
            plugins: [terser()]
        },
        {
            file: './dist/viewrouter.min.js',
            format: "umd",
            name: "ViewRouter", //name of the global object
            plugins: [terser()]
        }
    ],

}
