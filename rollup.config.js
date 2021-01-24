import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const extensions = ['.js', '.ts'];

const getPlugins = () => [
    peerDepsExternal({
        includeDependencies: true,
    }),
    resolve({ extensions }),
    commonjs({
        include: 'node_modules/**',
        exclude: ['**/*.test.tsx'],
        extensions,
    }),
    babel({
        babelrc: true,
        extensions,
        include: ['lib/**/*'],
        babelHelpers: 'bundled',
    }),
    terser(),
];

export default {
    input: 'lib/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: false,
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: false,
        },
    ],
    plugins: getPlugins(),
};
