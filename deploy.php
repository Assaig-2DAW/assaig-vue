<?php
namespace Deployer;

require 'recipe/common.php';

// Config

set('repository', 'https://github.com/Assaig-2DAW/assaig-vue.git');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

// Hosts

host('54.85.146.153')
    ->set('remote_user', 'deployer')
    ->set('deploy_path', '~/assaig-vue');

// Hooks

after('deploy:failed', 'deploy:unlock');
