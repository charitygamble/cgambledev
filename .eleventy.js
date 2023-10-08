module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/admin/')
    eleventyConfig.addPassthroughCopy('src/_includes');
    eleventyConfig.addPassthroughCopy('src/css');
    eleventyConfig.addPassthroughCopy('src/assets');
    eleventyConfig.addCollection('projects', (collection) => {
        return collection.getFilteredByGlob('src/projects/*.md');
    });
    eleventyConfig.addShortcode('year', () => {
        return `${new Date().getFullYear()}`;
    });

    return {
        dir: {
            input: 'src',
            output: 'public',
        },
    };
};