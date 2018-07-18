import React from "react";
import queryString from 'query-string';

const contextPath = "/IctClean2/";

const inputValidate = (propRefs) => {
		const {refs} = propRefs;
		let loop = true;		
		Object.keys(refs).every(function(key,index) {
			if( refs[key].required ){				
				if( $.trim( refs[key].value ).length === 0 ){
					alert( '['+refs[key].title+'] 입력해주세요.' );
					refs[key].focus();
					loop = false;
				}												
			}
			return loop;
		  });
		return loop;
}

const nullToString = (stateValue) => {
	return (null === stateValue || undefined === stateValue) ? '' : stateValue
}

const doDownLoad = (url,str_filename,org_filename,file_size) => {
	window.open(contextPath+url+'?str_filename='+str_filename+'&org_filename='+org_filename+'&file_size='+file_size,'_blank');
}

const doExcelDownLoad = (header,dataId,parameter) => {	
	window.open( contextPath+'excel/excel_download.do'+parameter+'&EXCEL_HEADER_ID='+header+'&EXCEL_QUERY_ID='+dataId,'_blank');
}

const setInputParameter = (paramters,obj) => {	
	if( undefined !== paramters ){		
		Object.keys(obj).forEach(function(key) {								
			if( key === 'pageIndex' )	return true;
			if( obj[key].type === 'checkbox' )				
				obj[key].checked =  undefined === paramters[key] ? false :  true;
			else			
				obj[key].value =  undefined === paramters[key] ? '' :  paramters[key];
		});
	}
}

const makeParameter = (refs,init) => {
	init = undefined === init ? {} : init; 
	let locationParam = queryString.parse( location.search )
	locationParam['pageIndex'] = 1;	
	Object.keys(refs).forEach(function(key) {
		
		if( refs[key].type === 'checkbox' ){
			if( refs[key].checked )
				locationParam[key] = refs[key].value;
			 else
			 	delete locationParam[key]
		}else{
			if( $.trim( refs[key].value).length === 0  )
				delete locationParam[key]
			else
				locationParam[key] = refs[key].value;		
		}
	});	
	locationParam = $.extend({}, locationParam, init);	
	return locationParam;
}
const modifyParameter = ( pname,value ) => {	
	let param = queryString.parse( location.search );			
	Array.isArray( pname ) ? pname.map( ( data , i ) => { param[data] = value[i];}) : param[pname] = value;
	return queryString.stringify(param)	
}

const locationGetValue = (pname) =>{
	let param = queryString.parse( location.search );
	return param[pname];
}

const EmptyData = ({value}) => { return( <tr><td colSpan={value}>조회결과가 없습니다.</td></tr> ) }

const OptionRander = ({data}) =>{ return (<option value={data.CODE} >{data.CODE_NAME}</option> ) }

class Paging extends React.Component{ 
	
	render() {		
		const { pageIndex,pageUnit,pageSize,firstIndex,lastIndex,totalCount,prevIndex,nextIndex } = this.props.links;
		const { onNavigate } = this.props
		let navLinks = [];
		let firstPageNoOnPageList 	= (Math.floor( (pageIndex-1) / pageSize) ) * pageSize + 1;
		let totalPageCount 			= Math.floor( (totalCount-1) / pageUnit ) + 1;
		let lastPageNoOnPageList = firstPageNoOnPageList + pageSize - 1;
		if(lastPageNoOnPageList > totalPageCount) lastPageNoOnPageList = totalPageCount;
		
		if(totalPageCount > pageSize){
			navLinks.push(<li key="firstIndex"><a onClick={()=>{onNavigate(1)}}><i className="fa fa-angle-double-left" aria-hidden="true"></i></a></li>);			
			navLinks.push(<li key="prevIndex" className="mr05" ><a onClick={()=>{onNavigate(prevIndex)}}><i className="fa fa-angle-left" aria-hidden="true"></i></a></li>);			
		}

		for (var i = firstPageNoOnPageList; i <= lastPageNoOnPageList;i++) {
			if (i == pageIndex) 
				navLinks.push( <li key={i} className="on"><a >{i}</a></li> );
			else				
				navLinks.push(<li key={i}><a onClick={(e)=>{onNavigate(e.target.innerText)}}>{i}</a></li>);
		}
		
		if (totalPageCount > this.props.links.pageSize) {
			navLinks.push(<li key="nextIndex" className="ml05" ><a onClick={()=>{onNavigate(nextIndex)}}><i className="fa fa-angle-right" aria-hidden="true"></i></a></li>);			
			navLinks.push(<li key="lastIndex"><a onClick={()=>{onNavigate(totalPageCount)}}><i className="fa fa-angle-double-right" aria-hidden="true"></i></a></li> );			
		}		
		return (
			<div className="page">
				<ul>
					{navLinks}				
				</ul>
			</div>			
		)
	}
}

export {
	contextPath
	,OptionRander
	,Paging
	,modifyParameter
	,locationGetValue
	,EmptyData
	,makeParameter
	,setInputParameter
	,doDownLoad
	,doExcelDownLoad
	,nullToString	
	,inputValidate
}