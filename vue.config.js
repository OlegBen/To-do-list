//Отключение eslint через конфиг
module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    }
};
