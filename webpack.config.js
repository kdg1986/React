'use strict';
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const preconConfig = {
        entry: {
            precon_preconReq : './src/main/react/precon/root/precon_preconReqRoot.jsx' 
        },
        output: {
            path: './src/main/resources/static/built/precon/',
            filename: '[name]_bundle.js'
        },
        resolve: {            
            extensions: ['', '.js', '.jsx'],
	        alias: {
		      root: path.resolve(__dirname, './src/main/react/'),
              client : path.resolve(__dirname, './src/main/react/client.js'),
              const : path.resolve(__dirname, './src/main/react/const.jsx'),
		      paging : path.resolve(__dirname, './src/main/react/components/paging.jsx'),
		      OptionRender : path.resolve(__dirname, './src/main/react/components/OptionRender.jsx'),
		      reduxModule : path.resolve(__dirname, './src/main/react/reduxStore/actionCreators.jsx'),
              reduxStore : path.resolve(__dirname, './src/main/react/reduxStore'),
              css :  path.resolve(__dirname, './src/main/resources/static/res/css/'),
              img :  path.resolve(__dirname, './src/main/resources/static/res/img/'),
              'react-datetimepicker-syaku' : path.resolve(__dirname, './src/main/react/components/react-datetimepicker-syaku.js'),
              common : path.resolve(__dirname, './src/main/react/components/')

		    }
        },
        module: {
            loaders: [
                        {
                            test: /\.jsx?$/,
                            exclude: /node_modules/,
                            loader: ['babel'],
                            query: {
                                    presets:['react','es2015','stage-2']
                            }            
                        },
                        {
                            test: /\.css$/,                            
                            loaders:[
                                'style',
                                'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                            ]    
                        },
                        {
                        	 test: /\.(gif|png|jpe?g|svg|eot|ttf|woff|woff(2)|eot)$/i,	
                        	 loader:'url-loader?mimetype=application/font-woff'
                        }                        
                    ]
        },    
        plugins: [
                  new webpack.NoErrorsPlugin()
        ]


};


module.exports = [
    preconConfig
];