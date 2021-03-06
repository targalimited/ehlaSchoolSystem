(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('msUtils', msUtils);

  /** @ngInject */
  function msUtils($timeout, $rootScope, $window, breadcrumb) {
    // Private variables
    var mobileDetect = new MobileDetect($window.navigator.userAgent),
      browserInfo = null;

    var levels = [
      { id: 'p1', name: 'P1' },
      { id: 'p2', name: 'P2' },
      { id: 'p3', name: 'P3' },
      { id: 'p4', name: 'P4' },
      { id: 'p5', name: 'P5' },
      { id: 'p6', name: 'P6' },
      { id: 'ks1', name: 'KS1' },
      { id: 'ks2', name: 'KS2' },
      { id: 'ks3', name: 'KS3' },
      { id: 'ks4', name: 'KS4' },
      { id: 'ks5', name: 'KS5' },
      { id: 'ks6', name: 'KS6' },
      { id: 's1', name: 'S1' },
      { id: 's2', name: 'S2' },
      { id: 's3', name: 'S3' },
      { id: 's4', name: 'S4' },
      { id: 's5', name: 'S5' },
      { id: 's6', name: 'S6' },
    ];

    var exerciseList = [
      {
        id: 1, name: 'New Vocabulary Exercise',
        child: [
          { id: 10, name: 'Spell the Words' },
          { id: 11, name: 'Mix and Match' },
          { id: 12, name: 'Fill in the Box' }
        ]
      },
      { id: 2, name: 'Comprehension Questions' },
      { id: 3, name: 'Thinking out of the Box' },
      { id: 4, name: 'Listening Exercise' },
      { id: 5, name: 'Extended Learning Exercise' },
      { id: 6, name: 'Audio Recording' },
    ]

    var service = {
      levels: levels,
      exerciseList: exerciseList,
      exists: exists,
      detectBrowser: detectBrowser,
      guidGenerator: guidGenerator,
      isMobile: isMobile,
      toggleInArray: toggleInArray,
      displayEHLALevels: displayEHLALevels,
      displaySchoolLevels: displaySchoolLevels,
      displayLanguage: displayLanguage,
      displayRoles: displayRoles,
      getMatches: getMatches,
      fixPreviewVideo: fixPreviewVideo,
    };

    return service;

    //////////

    function getMatches(string, regx, index) {
      index || (index = 1); // default to the first capturing group
      var matches = [];
      var match;
      var regex = regx || /<a href="ehla:\/\/playVideo\?itemID=(\d*)">/ig;
      while (match = regex.exec(string)) {
        matches.push(match[index]);
      }
      return matches;
    }

    function fixPreviewVideo(videoList) {
      $timeout(function () {
        $('#preview-dialog a[href^="ehla://"]').each(function (i) {
          $(this).parent().css('height', 'auto');
          $(this).parent().css('padding', '0');
          $(this).find('.img_video_playicon').css('top', '0');
          $(this).find('.img_video_img').wrap('<div style="position: relative" class="video-wrapper"></div>')
          var regex = /itemID=(\d*)/ig;
          var href = $(this).attr('href');
          var match = regex.exec(href);
          if (!match) {
            return;
          }
          var id = match[1];
          var video = _.find(videoList, function (v) {
            return parseInt(v.id) === parseInt(id);
          })
          if (!video) {
            console.log('id', id, 'video', video);
            return;
          }

          var media = video.media[0];
          $(this).find('div.video-wrapper').prepend('<div id="preview-video' + video.id + '-' + i + '" style="z-index: 1; width: 100%; position: absolute; height: 100%;"></div>');
          video.player = new Clappr.Player({
            source: media.file_path_hls || media.file_path,
            parentId: "#preview-video" + video.id + '-' + i,
            poster: 'assets/images/backgrounds/home_banner.png',
            width: '100%',
            height: '100%',
          });
          $("#preview-video" + video.id + '-' + i).hide();

          // $(elements[i]).removeAttr('href')
          $(this).click(function (evt) {
            evt.preventDefault();
            $(this).find('img').css('visibility', 'hidden');
            $("#preview-video" + video.id + '-' + i).show();
            video.player.play();
          })
        });
      })
    }

    function displayLanguage(langType) {
      langType = _.parseInt(langType)
      switch (true) {
        case langType === 3:
          return 'Mandarin';
        case langType === 2:
          return 'Cantonese';
        case langType === 1:
          return 'English';
      }

      return '-';
    }

    function displayEHLALevels(lvls) {
      if (!lvls || !lvls.length) {
        return '';
      }
      if (_.isString(lvls)) {
        lvls = lvls.split(',');
      }

      return _.trimEnd(_.reduce(lvls.sort(), function (result, level) {
        var foundLevel = _.find(levels, function (l) {
          return l.id === level;
        });
        if (foundLevel) {
          result += foundLevel.name + ', ';
        }
        return result;
      }, ''), ', ');
    }

    function displaySchoolLevels(lvls) {
      if (!lvls || !lvls.length) {
        return '';
      }
      // console.log(breadcrumb.values.levels, lvls);
      return _.trimEnd(_.reduce(lvls.sort(), function (result, level) {
        var foundLevel = _.find(breadcrumb.values.levels, function (l) {
          return l.id === level;
        });
        if (foundLevel) {
          result += foundLevel['name_' + $rootScope.language] + ', ';
        }
        return result;
      }, ''), ', ');
    }

    function displayRoles(userRoles, roles) {
      if (!userRoles || !userRoles.length) {
        return '';
      }
      return _.trimEnd(_.reduce(userRoles, function (result, level) {
        var foundLevel = _.find(roles, function (l) {
          return l.id === level.id;
        });
        if (foundLevel) {
          result += foundLevel.name + ', ';
        }
        return result;
      }, ''), ', ');
    }

    /**
     * Check if item exists in a list
     *
     * @param item
     * @param list
     * @returns {boolean}
     */
    function exists(item, list) {
      return list.indexOf(item) > -1;
    }

    /**
     * Returns browser information
     * from user agent data
     *
     * Found at http://www.quirksmode.org/js/detect.html
     * but modified and updated to fit for our needs
     */
    function detectBrowser() {
      // If we already tested, do not test again
      if (browserInfo) {
        return browserInfo;
      }

      var browserData = [
        {
          string: $window.navigator.userAgent,
          subString: 'Edge',
          versionSearch: 'Edge',
          identity: 'Edge'
        },
        {
          string: $window.navigator.userAgent,
          subString: 'Chrome',
          identity: 'Chrome'
        },
        {
          string: $window.navigator.userAgent,
          subString: 'OmniWeb',
          versionSearch: 'OmniWeb/',
          identity: 'OmniWeb'
        },
        {
          string: $window.navigator.vendor,
          subString: 'Apple',
          versionSearch: 'Version',
          identity: 'Safari'
        },
        {
          prop: $window.opera,
          identity: 'Opera'
        },
        {
          string: $window.navigator.vendor,
          subString: 'iCab',
          identity: 'iCab'
        },
        {
          string: $window.navigator.vendor,
          subString: 'KDE',
          identity: 'Konqueror'
        },
        {
          string: $window.navigator.userAgent,
          subString: 'Firefox',
          identity: 'Firefox'
        },
        {
          string: $window.navigator.vendor,
          subString: 'Camino',
          identity: 'Camino'
        },
        {
          string: $window.navigator.userAgent,
          subString: 'Netscape',
          identity: 'Netscape'
        },
        {
          string: $window.navigator.userAgent,
          subString: 'MSIE',
          identity: 'Explorer',
          versionSearch: 'MSIE'
        },
        {
          string: $window.navigator.userAgent,
          subString: 'Trident/7',
          identity: 'Explorer',
          versionSearch: 'rv'
        },
        {
          string: $window.navigator.userAgent,
          subString: 'Gecko',
          identity: 'Mozilla',
          versionSearch: 'rv'
        },
        {
          string: $window.navigator.userAgent,
          subString: 'Mozilla',
          identity: 'Netscape',
          versionSearch: 'Mozilla'
        }
      ];

      var osData = [
        {
          string: $window.navigator.platform,
          subString: 'Win',
          identity: 'Windows'
        },
        {
          string: $window.navigator.platform,
          subString: 'Mac',
          identity: 'Mac'
        },
        {
          string: $window.navigator.platform,
          subString: 'Linux',
          identity: 'Linux'
        },
        {
          string: $window.navigator.platform,
          subString: 'iPhone',
          identity: 'iPhone'
        },
        {
          string: $window.navigator.platform,
          subString: 'iPod',
          identity: 'iPod'
        },
        {
          string: $window.navigator.platform,
          subString: 'iPad',
          identity: 'iPad'
        },
        {
          string: $window.navigator.platform,
          subString: 'Android',
          identity: 'Android'
        }
      ];

      var versionSearchString = '';

      function searchString(data) {
        for (var i = 0; i < data.length; i++) {
          var dataString = data[i].string;
          var dataProp = data[i].prop;

          versionSearchString = data[i].versionSearch || data[i].identity;

          if (dataString) {
            if (dataString.indexOf(data[i].subString) !== -1) {
              return data[i].identity;

            }
          }
          else if (dataProp) {
            return data[i].identity;
          }
        }
      }

      function searchVersion(dataString) {
        var index = dataString.indexOf(versionSearchString);

        if (index === -1) {
          return;
        }

        return parseInt(dataString.substring(index + versionSearchString.length + 1));
      }

      var browser = searchString(browserData) || 'unknown-browser';
      var version = searchVersion($window.navigator.userAgent) || searchVersion($window.navigator.appVersion) || 'unknown-version';
      var os = searchString(osData) || 'unknown-os';

      // Prepare and store the object
      browser = browser.toLowerCase();
      version = browser + '-' + version;
      os = os.toLowerCase();

      browserInfo = {
        browser: browser,
        version: version,
        os: os
      };

      return browserInfo;
    }

    /**
     * Generates a globally unique id
     *
     * @returns {*}
     */
    function guidGenerator() {
      var S4 = function () {
        return (((1 + Math.random()) * 0x10000) || 0).toString(16).substring(1);
      };
      return (S4() + S4() + S4() + S4() + S4() + S4());
    }

    /**
     * Return if current device is a
     * mobile device or not
     */
    function isMobile() {
      return mobileDetect.mobile();
    }

    /**
     * Toggle in array (push or splice)
     *
     * @param item
     * @param array
     */
    function toggleInArray(item, array) {
      if (array.indexOf(item) === -1) {
        array.push(item);
      }
      else {
        array.splice(array.indexOf(item), 1);
      }
    }
  }
}());
