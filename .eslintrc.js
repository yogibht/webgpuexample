module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
        "no-extra-semi": "off",
        "semi": "off",
        "no-empty-function": "off",
        "no-extra-boolean-cast": "off",
        "indent": ["off"],
        "quotes": [
            "error",
            "double"
        ],
        "no-trailing-spaces": [2, { "skipBlankLines": true }],
		"comma-dangle": ["warn", {
			"arrays": "never",
			"objects": "never",
			"imports": "never",
			"exports": "never",
			"functions": "never"
		}]
    },
    overrides: [
        {
            files: ["*.ts", "*.js"],
            parserOptions: {
                project: ["./tsconfig.json"]
            },
            extends: [
                "eslint:recommended",
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking"
            ],
            rules: {
                "@typescript-eslint/no-unsafe-argument": "error",
                "@typescript-eslint/no-inferrable-types": "off",
                "@typescript-eslint/no-empty-interface": "off",
                "@typescript-eslint/no-extra-semi": "off",
                "@typescript-eslint/semi": ["error", "always"],
                "@typescript-eslint/no-empty-function": "off",
                "@typescript-eslint/indent": ["error", "tab", { "ignoredNodes": ["TemplateLiteral *"] }],
                "@typescript-eslint/member-delimiter-style": [
                    "error",
                    {
                        "multiline": {
                            "delimiter": "semi",
                            "requireLast": true
                        },
                        "singleline": {
                            "delimiter": "comma",
                            "requireLast": false
                        },
                        "multilineDetection": "brackets"
                    }
                ],
                "@typescript-eslint/explicit-function-return-type": "error",
                "@typescript-eslint/explicit-member-accessibility": [
                    "error",
                    {
                        accessibility: "explicit",
                        overrides: {
                            accessors: "explicit",
                            constructors: "no-public",
                            methods: "explicit",
                            properties: "explicit",
                            parameterProperties: "off"
                        }
                    }
                ],
                "@typescript-eslint/prefer-optional-chain": "warn",
				"@typescript-eslint/consistent-type-imports": "error",
				"@typescript-eslint/no-explicit-any": "error",
				"@typescript-eslint/explicit-module-boundary-types": "error"
            }
        }
    ]
};