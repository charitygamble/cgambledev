module.exports = function(eleventyConfig) {
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
  
    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
      eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {
          zone: 'utc'
        }).toFormat('yy-MM-dd');
      });
  
      eleventyConfig.addFilter("readableDate", dateObj => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat("MM-dd-yy");
    });
      
      // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if(!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  const fs = require("fs");
const NOT_FOUND_PATH = "_site/404.html";

module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          if (!fs.existsSync(NOT_FOUND_PATH)) {
            throw new Error(`Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`);
          }

          const content_404 = fs.readFileSync(NOT_FOUND_PATH);
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });
};
  