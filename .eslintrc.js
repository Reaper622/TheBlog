module.exports = {
    "extends": "standard",
    "ecmaFeatures": {
        "jsx": true,
        "modules": true
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "parser": "babel-eslint",
    "rules": {
        // 0/"off" 关闭规则 
        //1/"warn" 开启规则，使用警告,程序不会退出 
        //2/"error" 开启规则，使用错误，程序会退出
        'semi':['error','always'], // 添加分号
        "camelcase": 1, // 使用驼峰命名
        "react/jsx-uses-react": 1, // 防止在 JSX 中使用的变量被错误的标记为未使用
        "react/jsx-uses-vars": 1, // 防止 React 被错误的标记为未使用
        "react/react-in-jsx-scope": 2, // 使用 JSX 时防止丢失 React
    },
    "plugins": [
        "react"
    ]
};