<?php
/**
 *
 * @package Sample Realty Group
 * @author AppandWebDevelopers
 * @license GPL-2.0+
 * @link https://appandwebdevelopers.com/website-design-app-development/app-website-development/
 * @copyright 2019 AppandWebDevelopers - James Programming Printing Media Solutions. All rights reserved.
 *
 *            @wordpress-plugin
 *            Plugin Name: Sample Realty Group
 *            Plugin URI: https://appandwebdevelopers.com/website-design-app-development/app-website-development/
 *            Description: Retrieves Sample Realty Group Listings from the CRMLS
 *            Version: 40.6
 *            Author: AppandWebDevelopers
 *            Author URI: https://appandwebdevelopers.com/
 *            Text Domain: mls-dashboard-sample
 *            Contributors: AppandWebDevelopers
 *            License: GPL-2.0+
 *            License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

// Load Scripts
require_once(plugin_dir_path(__FILE__).'/includes/mls-dashboard-sample-scripts.php');
