@servers(['local' => '127.0.0.1'])

@task('optimize_clear', ['on' => 'local'])
    cd $(pwd)/.. && php artisan optimize:clear
@endtask

@task('storage_link', ['on' => 'local'])
    cd $(pwd)/.. && rm -rf public/storage && rm -rf public/assets/images/cryptoCurrency && php artisan storage:link
@endtask

@task('yarn', ['on' => 'local'])
    cd $(pwd)/.. && yarn
@endtask

@task('yarn_build', ['on' => 'local'])
    cd $(pwd)/.. && yarn build
@endtask

@task('composer_update', ['on' => 'local'])
    cd $(pwd)/.. && composer update
@endtask
