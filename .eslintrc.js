module.exports = {
  root: true,
  // 指定脚本的运行环境，不互斥，可指定多个
  env: {
    'browser': true,
    'jquery': true,
    'node': true,
    'commonjs': true,
    'es6': true,
  },
  // 当访问当前源文件内未定义的变量时，no-undef 规则将发出警告
  // 所以需要定义这些额外的全局变量
  'globals': {
    'OnlySVG': true,
    'monitor': true,
    'TWO': true,
  },
  // 指定解析器选项
  parserOptions: {
    "ecmaVersion": 9,
    // 使用额外的语言特性
    "ecmaFeatures": {
      "jsx": true
    },
    // module表示ECMAScript模块
    "sourceType": "module"
  },

  plugins: ["react"],
  extends: "eslint:recommended",
  // 启用的规则及其各自的错误级别
  rules: {
    // 箭头函数的空格使用规则
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    // 分号自动插入功能
    "semi": [0],
    // React组件
    "react/prop-types": [1],
    // 防止在JSX中使用的变量被错误地标记为未使用
    "react/jsx-uses-vars": 2,
    "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
    "jsx-a11y/anchor-is-valid": [0],
    "react/require-default-props": [0],
    // 箭头函数的书写规则
    "arrow-body-style": 0,
    // 代码块花括号前后的空格规则
    'block-spacing': [2, 'always'],
    // 逗号写在行首还是行尾
    'comma-style': [2, 'last'],
    // 对象的最后一项后面是否写逗号
    'comma-dangle': [2, 'never'],
    // 逗号前后是否有空格
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    // 缩进使用 tab 空格 还是
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
    // 关键字前后必须有空格
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    // 对象字面量冒号前后的空格使用规则
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    // 禁止对函数的参数重新赋值
    "no-param-reassign": 2,
    // 禁止出现令人困惑的多行表达式
    'no-unexpected-multiline': 2,
    // 禁止出现未使用过的变量（已声明的变量在代码里未被使用过）
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'none'
    }],
    // 连续空行的数量限制
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    // 禁止使用 console，提醒开发者，上线时要去掉
    'no-console': 1,
    // 强制在花括号中使用一致的空格
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    // 操作符左右必须有空格，比如 let sum = 1 + 2;
    'space-infix-ops': 2,
  }
}
