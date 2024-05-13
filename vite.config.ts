import path from 'path';
import obfuscator from 'rollup-plugin-obfuscator';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // obfuscator({
    //   global:false,
    //   options: {
    //     compact: true,
	  //     controlFlowFlattening: true,
	  //     deadCodeInjection: true,
	  //     debugProtection: true,
	  //     debugProtectionInterval: 0,
	  //     disableConsoleOutput: false,
	  //     identifierNamesGenerator: "hexadecimal",
	  //     log: false,
	  //     numbersToExpressions: false,
	  //     renameGlobals: false,
	  //     selfDefending: false,
	  //     simplify: true,
	  //     splitStrings: false,
	  //     stringArray: true,
	  //     stringArrayCallsTransform: false,
	  //     stringArrayCallsTransformThreshold: 0.5,
	  //     stringArrayEncoding: [],
	  //     stringArrayIndexShift: true,
	  //     stringArrayRotate: true,
	  //     stringArrayShuffle: true,
	  //     stringArrayWrappersCount: 1,
	  //     stringArrayWrappersChainedCalls: true,
	  //     stringArrayWrappersParametersMaxCount: 2,
	  //     stringArrayWrappersType: "variable",
	  //     stringArrayThreshold: 0.75,
	  //     unicodeEscapeSequence: false,
    //   }
    // })
  ],
  // esbuild: {
  //   drop: ['console', 'debugger'],//打包去除
  // },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'UEDColor',
      fileName: (format) => `ued-color.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'echats'],
      output: {
        // UedColor: 'UedColor',
      },
    },
  },
})
