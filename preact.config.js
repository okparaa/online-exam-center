const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const path = require('path');

export default {
    plugins: [],
    webpack(config, env, helpers, options) {
        config.plugins.push(
            new WorkboxWebpackPlugin.InjectManifest({
                swSrc: path.join(process.cwd(), 'src/src-sw.js'),
                swDest: 'sw.js',
                exclude: [
                    /\.map$/,
                    /manifest$/,
                    /\.htaccess$/,
                    /src-sw\.js$/,
                    /sw\.js$/,
                ],
            }),
        );
        if (env.isProd) {
            config.devtool = false;
        }
    },
};
