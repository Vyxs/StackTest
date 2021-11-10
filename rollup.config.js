import { terser } from 'rollup-plugin-terser';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import atImport from 'postcss-import';
import html from '@rollup/plugin-html';
import livereload from 'rollup-plugin-livereload';
import sveltePreprocess, { typescript } from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

const svelteConfig = {
    include: 'src/components/**/*.svelte',
    preprocess: sveltePreprocess({}),
    onwarn: (warning, handler) =>  handler(warning),
    compilerOptions: {
        customElement: false
    }
};

const resolveConfig = {
    browser: true
};

const htmlConfig = {
    title: 'StackTest',
    link: {
        rel: "stylesheet",
        type: "text/css",
        href: "index.css"
    }
};

const postcssConfig = {
    minimize: production,
    plugins: [
        atImport(),
        postcssNested,
        autoprefixer
    ]
};

const livereloadConfig = {
    watch: "dist"
};


export default {
    input: 'src/index.ts',
    output: {
        dir: "dist",
        format: 'iife',
		sourcemap: true
    },
    plugins: [
		typescript(),
        svelte(svelteConfig),
        resolve(resolveConfig),
		html(htmlConfig),
		postcss(postcssConfig),
		!production && livereload(livereloadConfig),
		production && terser()
    ]
}