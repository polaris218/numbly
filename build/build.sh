#!/usr/bin/env bash

BUILD_ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [[ ${BUILD_ROOT_DIR} != *"/build"* ]]
then
  BUILD_ROOT_DIR="$BUILD_ROOT_DIR/build"
fi

ROOT_DIR=$(dirname "${BUILD_ROOT_DIR}")

cd ${ROOT_DIR}

if [ ! -f ${ROOT_DIR}/composer.phar ]; then
    php -r "readfile('https://getcomposer.org/installer');" | php -- --install-dir=${ROOT_DIR}
fi

### Add updates after new commits (hook)

php ${ROOT_DIR}/composer.phar install -d ${ROOT_DIR}

php ${ROOT_DIR}/artisan view:clear
php ${ROOT_DIR}/artisan config:clear
php ${ROOT_DIR}/artisan cache:clear
php ${ROOT_DIR}/artisan clear-compiled
php ${ROOT_DIR}/artisan optimize
php ${ROOT_DIR}/artisan migrate --force


echo "Done..."