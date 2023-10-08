module.exports = function (eleventyConfig) {
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
const {
    DateTime
} = require("luxon");

eleventyConfig.addFilter('htmlDateString', (dateObj) =>{
    return DateTime.fromJSDate(dateObj, {
        zone:'utc'
    }).toFormat('yy-MM-dd');
});

eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
    }).toFormat('yy-MM-dd');
});

eleventyConfig.addFilter('head', (array, n) => {
    if(!Array.isArray(array) || array.length === 0) {
        return [];
    }
    if( n < 0 ) {
        return array.slice(n);
    }
    return array.slice(0, n);
});