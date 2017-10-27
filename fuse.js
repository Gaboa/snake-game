const {
    FuseBox,
    BabelPlugin,
    SassPlugin,
    CSSPlugin,
    WebIndexPlugin,
    Sparky
} = require('fuse-box');
const browserSync = require('browser-sync').create();

const fuse = FuseBox.init({
    homeDir: 'src',
    output: 'dist/$name.js',
    sourceMaps: { sourceRoot: 'src' },
    plugins: [
        CSSPlugin(),
        BabelPlugin({
            presets: ['env'],
            sourceMaps: true
        }),
        WebIndexPlugin({
            path: '.',
            template: 'src/index.html'
        })
    ]
});

fuse.dev(
    {
        port: 8000
    },
    server => {
        browserSync.init({
            proxy: `localhost:${8000}`
        });
    }
);

fuse
    .bundle('app')
    .instructions('> index.js')
    .target('browser')
    .watch()
    .completed(() => browserSync.reload());

Sparky.task('clean', () => {
    return Sparky.src('dist').clean('dist');
});

Sparky.task('watch:assets', () => {
    return Sparky.watch('**/*.+(svg|png|jpg|gif|ico|ogg|mp3|json|atlas)', {
        base: './src'
    }).dest('./dist');
});

Sparky.task('default', ['clean', 'watch:assets'], () => {
    return fuse.run();
});
