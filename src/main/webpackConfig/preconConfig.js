const webpack = require('webpack');
const path = require('path');

const preconConfig = {
        entry: {
            precon_preconReq : './src/main/react/precon/root/precon_preconReqRoot.jsx' //사전승낙 신청관리
        	,precon_preconCloseDownInfoPriceStats :  './src/main/react/precon/root/precon_preconCloseDownInfoPriceStatsRoot.jsx' //휴폐업 판매점 정보 정산 보고서
        	,precon_preconCloseDown : './src/main/react/precon/root/precon_preconCloseDownRoot.jsx' //휴폐업 이력 조회
       		,precon_review	: './src/main/react/precon/root/precon_reviewRoot.jsx' //휴폐업 이력 조회
        },
        output: {
            path: './src/main/resources/static/built/precon/',
            filename: '[name]_bundle.js'
        },
        resolve: {            
            extensions: ['', '.js', '.jsx'],
	        alias: {
		      root: path.resolve(__dirname, '../react/'),
              client : path.resolve(__dirname, '../react/client.js'),
              const : path.resolve(__dirname, '../react/const.jsx'),
		      paging : path.resolve(__dirname, '../react/components/paging.jsx'),
		      OptionRender : path.resolve(__dirname, '../react/components/OptionRender.jsx'),
		      reduxModule : path.resolve(__dirname, '../react/reduxStore/actionCreators.jsx'),
              reduxStore : path.resolve(__dirname, '../react/reduxStore'),
              css :  path.resolve(__dirname, '../resources/static/res/css/'),
              img :  path.resolve(__dirname, '../resources/static/res/img/'),
              'react-datetimepicker-syaku' : path.resolve(__dirname, '../react/components/react-datetimepicker-syaku.js'),
              common : path.resolve(__dirname, '../react/components/')
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

module.exports = preconConfig;