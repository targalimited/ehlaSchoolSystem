(function () {
  'use strict';

  /**
   * Main module of the Fuse
   */
  angular
    .module('fuse', [

      // Core
      'app.core',

      // Navigation
      'app.navigation',

      // Toolbar
      'app.toolbar',

      // Quick Panel
      'app.quick-panel',

      // Login
      'app.login',

      // Home
      'app.home',

      // Homework
      'app.homework',

			// Pilot 100
			'app.pilot',

      // Calendar
      'app.calendar',

      // Users
      'app.users',

      // Settings
      'app.settings',
    ]);
})();
