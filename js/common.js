/*******************************************************************************
 * (C)2013 Maurice Bleuel <mbleuel@bleuelmedia.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ******************************************************************************/
 
 /**
  * Common javascript functionality.
  * @author Maurice Bleuel
  */

/** Array to keep track of already imported libraries. */
_using_imported = [];

/**
 * Import (use) another JavaScript file and place it into HEAD element.
 * To have more control over this function, you can set the following globals:
 * - USING_SOURCE_PATH: The default path to prepend to source parameter. 
 * Defaults to "./".
 * - USING_FILE_EXT: The file extension to append to source file name.
 * Defaults to ".js".
 * @param string source Script path relative to current page.
 */
function using(source)
{
    if (typeof(source) != "string" || source.trim() == "")
        throw "using: Illegal value '" + source + "' for parameter 'source'";
    
    // Already imported?
    if ($.inArray(source, _using_imported) != -1)
        return;
    
    if (typeof(USING_SOURCE_PATH) != "string" || USING_SOURCE_PATH.trim() == "")
        USING_SOURCE_PATH = "./";
        
    if (typeof(USING_FILE_EXT) != "string" || USING_FILE_EXT.trim() == "")
        USING_FILE_EXT = ".js";
    
    _using_imported.push(source);
    source = USING_SOURCE_PATH + source + USING_FILE_EXT;
    var scr = document.createElement("script");
    scr.type = "text/javascript";
    scr.src = source;
    $("head")[0].appendChild(scr);
}

/**
 * Extract parameters of page URL.
 * @return Array with parameters: [key => value]
 */
function extractUrlParameters()
{
    var url = $(location).attr("href");
    
    var vars = [];
    var hashes = url.slice(url.indexOf("?") + 1).split("&");
    for (var i = 0; i < hashes.length; ++i) {
        var hash = hashes[i].split("=");
        vars[hash[0]] = hash[1];
    }
    
    return vars;
}