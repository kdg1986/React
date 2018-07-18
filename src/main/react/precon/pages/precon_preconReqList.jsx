import React,{Component} from "react";
import { connect } from 'react-redux';
import { parameterModule } from 'reduxModule';
import DatetimePicker, { parseDate, formatDate, formatDateString, setLocale } from 'react-datetimepicker-syaku';
import { contextPath, Paging, modifyParameter, EmptyData, makeParameter, OptionRander } from 'common';
import { Link,Redirect  } from 'react-router-dom';
import client from "client";
import locale from 'flatpickr/dist/l10n/ko';
import { FadeLoader } from 'react-spinners';
import queryString from 'query-string';
setLocale(locale.ko);
const root = 'api';
const listHref = contextPath + "api/precon/precon_preconReq?";
let sidoSearch = false;
class AppStatusList extends Component {
	
	componentDidMount(){ this.setInputParameter( this.props.location.state.refs , this.refs ); componentInit(); this.setCheck();}
	componentDidUpdate(prevProps, prevState){ if( prevProps.loading === this.props.loading ){ this.setInputParameter( this.props.location.state.refs , this.refs ); this.setCheck(); }}
	handleSearch = () => {  this.requestApi(queryString.stringify( makeParameter( this.refs ) )); }	
	doToggle = (e) => {	this.refs[ e.target.name === 'DOUBLE' ? 'SINGLE' : 'DOUBLE' ].disabled = e.target.checked ? true : false; }

	setInputParameter = (paramters,obj) => {			
		
		if( undefined !== paramters ){	
			Object.keys(obj).forEach(function(key) {								
				if( key === 'pageIndex' )	return true;
				if( key === 'sido' ){					
					if( $.trim( paramters[key] ).length > 0  ) {
						client({ method: 'GET'
								,path: contextPath+'api/ajax/pop_doro_sigungu'
								,params: { sido : paramters[key] } 
						}).done(response => {															
							const {code_sigungu} =  response.entity;
							$('#sigungu').empty();
							$('#sigungu').append(  $('<option/>',{ value :'',text : '전체' }) );
							for(let i=0; i< code_sigungu.length; i++){				
								$('#sigungu').append(  $('<option/>',{ value 	: code_sigungu[i].CODE
																	  ,text 	: code_sigungu[i].CODE_NAME 
																	  ,selected	: code_sigungu[i].CODE_NAME === paramters['sigungu'] ? true : false
								}) );
							}								
						});
					}					
					obj[key].value =  undefined === paramters[key] ? '' :  paramters[key];
				}else{
					if( obj[key].type === 'checkbox' )				
					obj[key].checked =  undefined === paramters[key] ? false :  true;
				else					
					obj[key].value =  undefined === paramters[key] ? '' :  paramters[key];
				}
			});
		}
	}
	
	requestApi = ( param,locationOption,initparam) => {
		const { history } = this.props;
		let arr=[];
		const {refs} = this;
		if( locationOption !== 'const' ){			
			['NORMAL','TM','VISIT','SPCH'].forEach(function(key){
				if( refs[key].checked ) arr.push( refs[key].value )
			});
		}
		parameterModule.loadingState()
		client({ method: 'GET'
				,path: listHref+param
				,params: { spch_arr : arr } }).done(response => {					
			parameterModule.loadingState()
			const state = { 
				...this.props.location.state 
				,dataList: response.entity.resultList
				,links: response.entity.page				
				,code_filed_cd:	response.entity.code_filed_cd 
				,con_status_cd : response.entity.CON_STATUS_CD
				,status_cd	: response.entity.STATUS_CD
				,service_type_cd_val	: response.entity.SERVICE_TYPE_CD_VAL
				,code_sido	: response.entity.code_sido
				,telecom_cd	: response.entity.TELECOM_CD
				,refs : makeParameter( this.refs,initparam)				
			};			
			(  undefined ===  locationOption ) ? history.push( '/list?'+param,{...state}) 
				: history.replace( '/list?'+param,{...state});
		});
	}

	getGugun = (value) => {		
		
		const sido = value;		
		client({ method: 'GET'
				,path: contextPath+'api/ajax/pop_doro_sigungu'
				,params: { sido : sido } 
		}).done(response => {															
			const {code_sigungu} =  response.entity;
			$('#sigungu').empty();
			$('#sigungu').append(  $('<option/>',{ value :'',text : '전체' }) );						
			for(let i=0; i< code_sigungu.length; i++){
				$('#sigungu').append(  $('<option/>',{ value : code_sigungu[i].CODE,text : code_sigungu[i].CODE_NAME }) );
			}			
		});
	}

	setCheck = () => {
		const {refs} = this;		
		if( refs.filed_cd.selectedIndex === 0 ){			
			refs.DOUBLE.disabled = true;
			refs.SINGLE.disabled = true;
			refs.DOUBLE.checked = false;
			refs.SINGLE.checked = false;
		}else{
			refs.DOUBLE.disabled = false;
			refs.SINGLE.disabled = false;
			if(refs.DOUBLE.checked) refs.SINGLE.disabled = true;
			if(refs.SINGLE.checked) refs.DOUBLE.disabled = true;
		}
	}

	render() {				
		if( undefined === this.props.location.state ){
			this.props.location.state = {
				dataList :[]
				,links : {}
				,code_filed_cd:[]
				,con_status_cd : []
				,status_cd	: []
				,service_type_cd_val	: []
				,code_sido	: []
				,telecom_cd	: []
				,code_sigungu: []
				,sido:''
			}
			this.requestApi('pageIndex=1','const');
		}
		const Data = ( {data} ) => {	
			return (
				<tr>
					<td>{data.R_NUM}  </td>
					<td>{data.PRECON_REQ_ID}</td>										
					{ data.FILED_CD === 'F5001' ? (<td className="register_color_blue">무선</td>) : (<td className="register_color_red">유선</td>) }
					{ data.SERVICE_TYPE_CD === 'F4001' ? (<td className="register_color_blue">오프라인</td>) : (<td className="register_color_red">온라인</td>) }
					<td>{data.SIDO_NM}&nbsp;{data.GUGUN_NM}</td>
					<td>{data.SHOP_NM}</td>
					<td>{data.STORE_NM}</td>
					<td>{data.REPRESENT_NM}</td>				
					<td>{data.CON_STATUS_NM}</td>
					<td>{data.STATUS_NM}</td>
				</tr>			
			)
		}
		const {dataList,links,code_filed_cd,con_status_cd,status_cd,service_type_cd_val,code_sido,telecom_cd,code_sigungu,sido} = this.props.location.state;

		const data =  dataList.length === 0 ? <EmptyData value="9" /> : dataList.map( (data,index) => <Data key={index} data={data} /> )
		const r_codeFiledCd = code_filed_cd.map( (data,index) => <OptionRander key={index} data={data} /> );
		const r_con_status_cd = con_status_cd.map( (data,index) => <OptionRander key={index} data={data} /> );
		const r_status_cd = status_cd.map( (data,index) => <OptionRander key={index} data={data} /> );
		const r_service_type_cd_val = service_type_cd_val.map( (data,index) => <OptionRander key={index} data={data} /> );
		const r_code_sido = code_sido.map( (data,index) => <OptionRander key={index} data={data} /> );
		const r_telecom_cd = telecom_cd.map( (data,index) => <OptionRander key={index} data={data} /> );
		const r_gugun_cd = code_sigungu.map( (data,index) => <OptionRander key={index} data={data} /> );

		const today = new Date();
		return (
			<div>				
				<div className="page_title"> 사전승낙 관리 > <span className="page_subtitle">사전승낙신청 관리</span></div>
				<div className="search_box_2tab search_block">
				<div className="spinner"><FadeLoader color={'#77d4ff'} loading={this.props.loading}  /></div>
					<ul className="search_box_2tabselect">
						<li className="on">기본검색</li>
						<li>상세검색</li>
					</ul>
					<div id="search_box">
						<div className="search_box_2tabarea basic">
							<div className="search_div">
								<div className="divrow">
									<div className="divcol">
										<span className="search_th">신청구분</span>
										<select ref="filed_cd" id="filed_cd" title="사전승낙 신청구분" onChange={this.setCheck} >
											<option value="">전체</option>
											{r_codeFiledCd}										
										</select>
									</div>
									<div className="divcol">										
										<label className="checkbox_box">
											<input type="checkbox" name="SINGLE" id="SINGLE" ref="SINGLE" value="Y" onChange={this.doToggle}  disabled /><i className="checkbox_icon"></i>단독신청 판매점
										</label>
										<label className="checkbox_box">
											<input type="checkbox" name="DOUBLE" id="DOUBLE" ref="DOUBLE" value="Y" onChange={this.doToggle}  disabled/><i className="checkbox_icon"></i>결합신청 판매점
										</label>
									</div>																		
								</div>
								<div className="divrow">
									<div className="divcol">
											<span className="search_th">승낙상태</span>
											<select ref="CON_STATUS_CD_VAL" id="CON_STATUS_CD_VAL" title="승낙상태" >
												<option value="">전체</option>
												{r_con_status_cd}
											</select>
									</div>
									<div className="divcol">
											<span className="search_th">처리상태</span>
											<select ref="STATUS_CD_VAL" id="STATUS_CD_VAL" title="처리상태" >
												<option value="">전체</option>
												{r_status_cd}
											</select>
									</div>
								</div>
							</div>
						</div>

				<div className="search_box_2tabarea detail">
					<div className="search_div">
						<div className="divrow">
							<div className="divcol">
								<span className="search_th">서비스 형태</span>
								<select ref="SERVICE_TYPE_CD" id="SERVICE_TYPE_CD" title="서비스 형태" >
									<option value="">전체</option>
									{r_service_type_cd_val}
								</select>
							</div>
							<div className="divcol">										
								{/* <span className="search_th">판매 형태</span> */}
								<label className="checkbox_box">
									<input type="checkbox" name="NORMAL" id="NORMAL" ref="NORMAL" value="G1010"/><i className="checkbox_icon"></i>일반
								</label>
								<label className="checkbox_box">
									<input type="checkbox" name="TM" id="TM" ref="TM" value="G1020"/><i className="checkbox_icon"></i>TM
								</label>
								<label className="checkbox_box">
									<input type="checkbox" name="VISIT" id="VISIT" ref="VISIT" value="G1030"/><i className="checkbox_icon"></i>방문판매
								</label>
								<label className="checkbox_box">
									<input type="checkbox" name="SPCH" id="SPCH" ref="SPCH" value="G1040"/><i className="checkbox_icon"></i>다단계판매점
								</label>
							</div>							
						</div>
						<div className="divrow">	
							<div className="divcol">
								<span className="search_th">시/도</span>
								<select ref="sido" id="sido" title="시/도" onChange={(e)=>{ this.getGugun(e.target.value) }}>
									<option value="">전체</option>
									{r_code_sido}
								</select>
							</div>
							<div className="divcol">
								<span className="search_th">구/군</span>
								<select ref="sigungu" id="sigungu" title="시/군/구" onChange={this.setRef}>
									<option value="">전체</option>
									{r_gugun_cd}
								</select>
							</div>
							<div className="divcol">
								<span className="search_th">상세주소</span>
								<input type="text" placeholder="상세주소" ref="ADDR_VAL" />								
							</div>
						</div>
						<div className="divrow">
							<div className="divcol">
								<span className="search_th">판매점명</span>
								<input type="text" placeholder="판매점명" ref="SHOP_NM_VAL" />
							</div>
							<div className="divcol">
								<span className="search_th">하부점명(간판명)</span>
								<input type="text" placeholder="하부점명(간판명)" ref="STORE_NM_VAL" />
							</div>
							<div className="divcol">
								<span className="search_th">담당자</span>
								<input type="text" placeholder="담당자" ref="ADMIN_NM_VAL" />
							</div>
						</div>
						<div className="divrow">
							<div className="divcol">
								<span className="search_th">대표자</span>
								<input type="text" placeholder="대표자" ref="REPRESENT_NM_VAL" />
							</div>
							<div className="divcol">
								<span className="search_th">사업자 등록번호</span>								
								 <input type="text" name="CORP_NUM1_VAL" ref="CORP_NUM1_VAL"  size="3" maxLength="3"/>
								-<input type="text" name="CORP_NUM2_VAL" ref="CORP_NUM2_VAL"  size="2" maxLength="2"/>
								-<input type="text" name="CORP_NUM3_VAL" ref="CORP_NUM3_VAL"  size="5" maxLength="5"/>
							</div>
							<div className="divcol">
								<span className="search_th">접수번호</span>
								<input type="text" placeholder="접수번호" ref="PRECON_REQ_ID_VAL" />
							</div>
						</div>
						<div className="divrow">	
							<div className="divcol">
								<span className="search_th">신청기간</span>
								<input type="text" className="datepicker" ref="REQ_BEG_DT_VAL" placeholder="날짜선택" readOnly />
								<span>- </span>
								<input type="text" className="datepicker" ref="REQ_END_DT_VAL" placeholder="날짜선택" readOnly />
							</div>
							<div className="divcol">
								<span className="search_th">통신사</span>
								<select ref="TELECOM_CD2_VAL" id="TELECOM_CD2_VAL" title="통신사" >
									<option value="">전체</option>
									{r_telecom_cd}
								</select>
							</div>
							<div className="divcol">
									<span className="search_th">사전승낙번호</span>
									<input type="text" placeholder="사전승낙번호" ref="CERT_NUM" />
							</div>
						</div>						
					</div>
				</div>
				</div>
					<div className="tar pd20 pdb0">					
							<a onClick={this.handleSearch} className="normal_btn purplebtn">검색</a>
							<a href="#" className="normal_btn purplebtn02">엑셀</a>					
					</div>
				</div>

				<div className="full_collum collum">					
					<ul>
						<li className="collum_tit">
							<h2>기본정보</h2>	
							<select ref="pageUnit" onChange={ (e) => { this.requestApi( modifyParameter( ['pageUnit','pageIndex'] ,[e.target.value,'1']) ); }}>
								<option value="10">10개 보기</option>
								<option value="20">20개 보기</option>
								<option value="40">40개 보기</option>
								<option value="80">80개 보기</option>
							</select>									
							<span className="showtoggle minus"></span>
							<ul>
								<li>
									<table className="col_10" >
										<thead>
											<tr>
												<th>NO</th>
												<th>접수번호</th>
												<th>유/무선</th>
												<th>온/오프라인</th>
												<th>지역</th>
												<th>판매점명</th>
												<th>하부점명(간판명)</th>
												<th>대표자</th>
												<th>승낙상태</th>
												<th>처리상태</th>
											</tr>
										</thead>	
										<tbody>
											{data}                                              
										</tbody>
									</table>										
									<Paging links={links} onNavigate={(pagenum) => { this.requestApi( modifyParameter('pageIndex',pagenum) ); }} />
								</li>
							</ul>
						</li>
					</ul>						
				</div>
			</div>
		) 
	}
}

export default connect(
	(state) => ({
	  number: state.parameters.number
	  ,query: state.parameters.query	  
	  ,loading: state.parameters.loading	  
	})	
  )(AppStatusList);