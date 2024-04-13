export const REFUND_CATEGORY_ID = "97b483f4-5452-43e4-9d40-2eadc28bfc0f"

export const TRANSACTION_TYPE = {
  INCOME: 1,
  EXPENSE: 2,
}

export const TRANSACTION_QUERY = `
  id,
  amount,
  description,
  date,
  notes,
  user_id,
  is_recurring,
  transactions_instance!inner(is_done, is_cancelled, is_refunded),
  account!inner(id, name),
  transaction_types (
    id,
    name
  ),
  clients (
    id,
    name
  ),
  transaction_categories (
    id,
    name,
    icon,
    category_groups (
      id, 
      name, 
      color
    )
  )
`
export const accounts = [
  {
    name: "ACCREDITO-SCD",
    imgUrl: "https://www.accredito-scd.com.br/Content/img/logoaccreditoopen.svg",
  },
  {
    name: "ADIQ AS",
    imgUrl: "https://ob-public-files.s3.amazonaws.com/icone_logo_of.png",
  },
  {
    name: "Agibank",
    imgUrl: "https://www.agibank.com.br/logo.svg",
  },
  {
    name: "Ágora Investimentos",
    imgUrl: "https://www.agorainvest.com.br/images/OpenFinance/agora.svg",
  },
  {
    name: "AgZero",
    imgUrl: "https://www.safra.com.br/shared/assets/img/agzero-of.svg",
  },
  {
    name: "AILOS",
    imgUrl: "https://www.ailos.coop.br/wp-content/uploads/2023/06/Logos_512x512px_Ailos.svg",
  },
  {
    name: "AL5 BANK",
    imgUrl: "https://al5bank.com.br/wp-content/themes/al5bank/assets/img/logo-al5bank.svg",
  },
  {
    name: "Alfa",
    imgUrl: "https://bancoalfa.com.br/institucional/downloads/AlfaLogoAzul.svg",
  },
  {
    name: "AME DIGITAL",
    imgUrl: "https://s3.amazonaws.com/images.amedigital.com/site-ame/2023/6/Ame-Symbol.svg",
  },
  {
    name: "Asaas",
    imgUrl: "https://asaas-obb.s3.sa-east-1.amazonaws.com/public/Logo-Asaas-Azul.svg",
  },
  {
    name: "Azimut Brasil",
    imgUrl: "https://openbanking-redirect.xpi.com.br/assets/xpi.svg",
  },
  {
    name: "Banco ABC Brasil",
    imgUrl: "https://openfinance-consent.abcbrasil.com.br/assets/img/bancoabc.svg",
  },
  {
    name: "Banco Arbi S/A",
    imgUrl: "https://images.bancoarbi.com.br/logo-2.svg",
  },
  {
    name: "Banco Bari",
    imgUrl: "https://www.bancobari.com.br/assets/openbanking/logo-banco-bari.svg",
  },
  {
    name: "Banco Bmg S.A",
    imgUrl: "https://www.bancobmg.com.br/data/files/8C/A2/7F/0A/FBA318104A94D208970BE9C2/bmg_open_finance.svg",
  },
  {
    name: "BANCO BS2 SA",
    imgUrl: "https://iconape.com/wp-content/files/tl/209601/svg/209601.svg",
  },
  {
    name: "Banco da Amazônia",
    imgUrl: "https://www.bancoamazonia.com.br/images/openbanking/logo_semnome_positiva.svg",
  },
  {
    name: "BANCO DE LA NACION ARGENTINA",
    imgUrl: "https://qr-h.cornerpix.com.br/public/images/logo_banco_nacional_argentina.svg",
  },
  {
    name: "Banco Digimais",
    imgUrl: "https://www.bancodigimais.com.br/assets/images/DIGIMAIS2023-Logo-512x512px-Vert.svg",
  },
  {
    name: "banco Digio",
    imgUrl: "https://static.digio.com.br/media/logo_9b7226957a.svg",
  },
  {
    name: "Banco do Brasil",
    imgUrl: "https://www.bb.com.br/docs/pub/inst/img/LogoBB.svg",
  },
  {
    name: "Banco do Nordeste do Brasil S.A.",
    imgUrl: "https://consentimento.openfinance.bnb.gov.br/logo_bnb.svg",
  },
  {
    name: "Banco Fibra",
    imgUrl: "https://siteinstitucional-prod.s3.amazonaws.com/wp-content/uploads/2023/09/05212222/bancofibra_logo-1.svg",
  },
  {
    name: "Banco Genial",
    imgUrl: "https://media-genial-cms.genialinvestimentos.com.br/wp-content/uploads/2021/08/20161050/logo-genial.svg",
  },
  {
    name: "Banco Guanabara",
    imgUrl: "https://www.bancoguanabara.com.br/logo/logo_new3.svg",
  },
  {
    name: "BANCO INDUSTRIAL DO BRASIL",
    imgUrl: "https://qr-h.cornerpix.com.br/public/images/logo_bib.svg",
  },
  {
    name: "Banco Inter PF",
    imgUrl: "https://d2ga2iknz0in5b.cloudfront.net/inter-logos/512.svg",
  },
  {
    name: "Banco Inter PJ",
    imgUrl: "https://d2ga2iknz0in5b.cloudfront.net/inter-logos/inter_empresas_1.svg",
  },
  {
    name: "BANCO KEB HANA DO BRASIL S.A.",
    imgUrl: "https://bancokebhana.com.br/open-banking/KEBHANA.svg",
  },
  {
    name: "Banco Master S.A.",
    imgUrl: "https://www.bancomaster.com.br/images/logo-banco-master.svg",
  },
  {
    name: "Banco Mercantil",
    imgUrl: "https://bancomercantil.com.br/resources/openbanking/Logo_Mercantil.svg",
  },
  {
    name: "Banco Modal",
    imgUrl: "https://modal-logado-prd-cdn.azureedge.net/openbanking/modalmais.svg",
  },
  {
    name: "Banco Original",
    imgUrl: "https://picpay.s3.sa-east-1.amazonaws.com/openbanking/logo-original.svg",
  },
  {
    name: "Banco Original S.A",
    imgUrl: "https://picpay.s3.sa-east-1.amazonaws.com/openbanking/logo-original.svg",
  },
  {
    name: "Banco PAN",
    imgUrl: "https://www.bancopan.com.br/content/dam/documentos/outros-produtos/open-banking/logo_pan_openbanking.svg",
  },
  {
    name: "Banco Paulista",
    imgUrl: "https://www.bancopaulista.com.br/imagens/openbanking.svg",
  },
  {
    name: "Banco RCI - Brasil",
    imgUrl: "https://www.mobilize-fs.com.br/wp-content/uploads/2023/11/logo_banco_rci.svg",
  },
  {
    name: "Banco Ribeirão Preto",
    imgUrl: "https://brp.com.br/img_ob/logo_brp_open_finance.svg",
  },
  {
    name: "Banco Santander Pessoa Física",
    imgUrl: "https://cms.santander.com.br/sites/WPS/imagem/santander_chama/23-10-31_194829_P_santander_chama.svg",
  },
  {
    name: "Banco Santander Pessoa Jurídica",
    imgUrl: "https://cms.santander.com.br/sites/WPS/imagem/santander_chama/23-10-31_194829_P_santander_chama.svg",
  },
  {
    name: "Banco Sofisa S.A.",
    imgUrl: "https://www.sofisa.com.br/openbanking/logo_sofisa.svg",
  },
  {
    name: "BANCO TOPAZIO",
    imgUrl: "https://bancotopazio.com.br/storage/logo_tp_512.svg",
  },
  {
    name: "Banco Voiter SA",
    imgUrl: "https://uploads-ssl.webflow.com/60466aedbbe198305d9b6bfd/64efb66aed5fe59b46d07a22_logo-voiter-512x512.svg",
  },
  {
    name: "BANCO WOORI BANK PF",
    imgUrl: "https://wooribank.com.br/wp-content/uploads/2023/09/logo-wooribank.svg",
  },
  {
    name: "BANCO WOORI BANK PJ",
    imgUrl: "https://wooribank.com.br/wp-content/uploads/2023/09/logo-wooribank.svg",
  },
  {
    name: "Banco XP S.A.",
    imgUrl: "https://openbanking-redirect.xpi.com.br/assets/xpi.svg",
  },
  {
    name: "Banco XP S.A. (Rico)",
    imgUrl: "https://openbanking-redirect.xpi.com.br/assets/rico.svg",
  },
  {
    name: "Banco XP S.A. (XP Empresas)",
    imgUrl: "https://openbanking-redirect.xpi.com.br/assets/xp_empresas.svg",
  },
  {
    name: "BANESE",
    imgUrl: "https://consentimento.openbanking.banese.com.br/logo_banese.svg",
  },
  {
    name: "Banestes SA",
    imgUrl: "https://cdn.banestes.b.br/openbanking/img/logo_centralizada.svg",
  },
  {
    name: "Bankly",
    imgUrl: "https://logo.open.bankly.com.br/logo-bankly.svg",
  },
  {
    name: "Banpará",
    imgUrl: "https://www.banpara.b.br/PortalImagens/52jlv5s3/logobanparaos5415-01.svg",
  },
  {
    name: "banQi",
    imgUrl: "https://hml-dev-portal.s3.us-east-2.amazonaws.com/banqi-logo.svg",
  },
  {
    name: "Banrisul",
    imgUrl: "https://banrisul.com.br/bob/data/Simbolo-Banrisul.svg",
  },
  {
    name: "Belvo",
    imgUrl: "https://statics.belvo.io/images/belvo_of_logo.svg",
  },
  {
    name: "BN",
    imgUrl: "https://ob-public-files.s3.amazonaws.com/icone_logo_of.png",
  },
  {
    name: "BNDES",
    imgUrl: "https://www.bndes.gov.br/arquivos/openbanking/BNDES_arquivo_marca.svg",
  },
  {
    name: "BOCOM BBM",
    imgUrl:
      "https://www.bocombbm.com.br/bbm-content./uploads/2023/10/logo-512x512-com-90px-de-espacamento-da-borda.svg",
  },
  {
    name: "BONUSPAGO SCD S.A.",
    imgUrl: "https://qr-h.cornerpix.com.br/public/images/logo-bonuspago.svg",
  },
  {
    name: "BPP",
    imgUrl: "https://auth.openbanking.bpp.com.br/brands/dock/LogoDock.svg",
  },
  {
    name: "Bradescard",
    imgUrl: "https://banco.bradesco/open-finance/logo/icones_vetorial-pf.svg",
  },
  {
    name: "Bradesco Cartões PJ",
    imgUrl: "https://banco.bradesco/open-finance/logo/icones_vetorial-pf.svg",
  },
  {
    name: "Bradesco Financiamentos",
    imgUrl: "https://openbanking.losango.com.br/Openbanking/logo/bradesco-bbf.svg",
  },
  {
    name: "Bradesco Pessoa Física",
    imgUrl: "https://banco.bradesco/open-finance/logo/icones_vetorial-pf.svg",
  },
  {
    name: "Bradesco Pessoa Jurídica",
    imgUrl: "https://banco.bradesco/open-finance/logo/icones_vetorial-pj.svg",
  },
  {
    name: "BRASILCARD",
    imgUrl: "https://storage.googleapis.com/brasilcard-public/icons/logo-ob.svg",
  },
  {
    name: "BRB - Banco de Brasilia SA",
    imgUrl: "https://auth-obk.brb.com.br/openbanking/v1/logo/brb.svg",
  },
  {
    name: "BTG Banking",
    imgUrl: "https://banking-public-prd.s3.sa-east-1.amazonaws.com/open-finance/logo/btgbanking/btgbanking.svg",
  },
  {
    name: "BTG Corporate",
    imgUrl:
      "https://banking-public-prd.s3.sa-east-1.amazonaws.com/open-finance/logo/corporate/btg_pactual_corporate_logo.svg",
  },
  {
    name: "BTG Empresas",
    imgUrl: "https://banking-public-prd.s3.sa-east-1.amazonaws.com/open-finance/logo/btgempresas/btgempresas.svg",
  },
  {
    name: "BTG Investimentos",
    imgUrl:
      "https://banking-public-prd.s3.sa-east-1.amazonaws.com/open-finance/logo/btginvestimentos/btginvestimentos.svg",
  },
  {
    name: "BTG Wealth Management",
    imgUrl:
      "https://banking-public-prd.s3.sa-east-1.amazonaws.com/open-finance/logo/wm/btg_pactual_wealth_management_logo.svg",
  },
  {
    name: "BV - Corporate",
    imgUrl: "https://www.bv.com.br/site/resources/open-finance/logo-bv.svg",
  },
  {
    name: "BV - Pessoa Física - APP",
    imgUrl: "https://www.bv.com.br/site/resources/open-finance/logo-bv.svg",
  },
  {
    name: "BV - Pessoa Física - Web",
    imgUrl: "https://www.bv.com.br/site/resources/open-finance/logo-bv.svg",
  },
  {
    name: "BV - Private",
    imgUrl: "https://www.bv.com.br/site/resources/open-finance/logo-bv.svg",
  },
  {
    name: "C6 Bank",
    imgUrl: "https://cdn.c6bank.com.br/open-banking/c6bank-logo.svg",
  },
  {
    name: "CAIXA",
    imgUrl: "https://consentimento.openbanking.caixa.gov.br/assets/images/logomarca_caixa.svg",
  },
  {
    name: "Cartão Luiza",
    imgUrl: "https://www.itau.com.br/media/dam/m/f07000821f90d00/original/Cartao-Luiza.svg",
  },
  {
    name: "Cartos SCD",
    imgUrl: "https://qr-h.cornerpix.com.br/spi-qrcode/public/images/logo-cartos.svg",
  },
  {
    name: "Caruana SCFI",
    imgUrl: "https://caruanafinanceira.com.br/openbanking/assets/obb/logo.svg",
  },
  {
    name: "casadocredito",
    imgUrl: "https://ob-public-files.s3.amazonaws.com/icone_logo_of.png",
  },
  {
    name: "CCB BRASIL",
    imgUrl: "https://ob-public-files.s3.amazonaws.com/icone_logo_of.png",
  },
  {
    name: "CIELO",
    imgUrl: "https://www.cielo.com.br/assets_cielo/logo_footer_cielo.svg",
  },
  {
    name: "CITI",
    imgUrl: "https://corporateportal.brazil.citibank.com/resources-responsive/img/Citi_Blue-RedArc_RGB.svg",
  },
  {
    name: "Citibank Distribuidora De TVM",
    imgUrl: "https://corporateportal.brazil.citibank.com/resources-responsive/img/Citi_Blue-RedArc_RGB.svg",
  },
  {
    name: "Citibank N.A.",
    imgUrl: "https://corporateportal.brazil.citibank.com/resources-responsive/img/Citi_Blue-RedArc_RGB.svg",
  },
  {
    name: "Citigroup Global Markets Brasil CCTVM",
    imgUrl: "https://corporateportal.brazil.citibank.com/resources-responsive/img/Citi_Blue-RedArc_RGB.svg",
  },
  {
    name: "Cora Auth Server",
    imgUrl: "https://corastatic.com/openbank/img/logo-cora.svg",
  },
  {
    name: "Credi Nissan",
    imgUrl: "https://www.mobilize-fs.com.br/wp-content/uploads/2023/11/logo_credi_nissan.svg",
  },
  {
    name: "CrediAliança",
    imgUrl: "https://qr-h.cornerpix.com.br/spi-qrcode/public/images/logo-credialianca-512.svg",
  },
  {
    name: "Credicard",
    imgUrl: "https://www.itau.com.br/media/dam/m/355722921baa017d/original/Credicard.svg",
  },
  {
    name: "Credicoamo",
    imgUrl: "https://conteudo.credicoamo.com.br/ob/logo_credicoamo.svg",
  },
  {
    name: "Credicoopavel",
    imgUrl: "https://internetbanking.credicoopavel.com.br/open-banking/images/logo.svg",
  },
  {
    name: "CREDISAN",
    imgUrl: "https://www.credisan.com.br/credisan_logomarca.svg",
  },
  {
    name: "CrediSIS",
    imgUrl: "https://credisis.com.br/assets/credisis_logo.svg",
  },
  {
    name: "Crefisa",
    imgUrl: "https://www.crefisa.com.br/wp-content/uploads/2019/05/Logo.svg",
  },
  {
    name: "CREHNOR LARANJEIRAS",
    imgUrl: "https://ob-public-files.s3.amazonaws.com/icone_logo_of.png",
  },
  {
    name: "creserv",
    imgUrl: "https://ob-public-files.s3.amazonaws.com/icone_logo_of.png",
  },
  {
    name: "Cresol",
    imgUrl: "https://cresol.com.br/util/cresol-logo-obk.svg",
  },
  {
    name: "Daycoval",
    imgUrl: "https://cdn.daycoval.com.br/obbr/daycoval.svg",
  },
  {
    name: "dLocal",
    imgUrl: "https://www.dlocal.com/brand-logo.svg",
  },
  {
    name: "EBANX",
    imgUrl: "https://ebanxip-static-file.s3.sa-east-1.amazonaws.com/ebanx-ip-blue.svg",
  },
  {
    name: "Efí S.A.",
    imgUrl: "https://gerencianet-pub-prod-1.s3.amazonaws.com/openbanking/efi-by-gn-512x512.svg",
  },
  {
    name: "Empréstimo Sim",
    imgUrl: "https://emprestimosim.com.br/assets/images/open-finance-sim-logo.svg",
  },
  {
    name: "Ewally",
    imgUrl: "https://www.ewally.com.br/wp-content/uploads/2023/05/1-logotipo_linha_turquesa_vertical.svg",
  },
  {
    name: "Fidúcia",
    imgUrl: "https://ob-public-files.s3.amazonaws.com/icone_logo_of.png",
  },
  {
    name: "FitBank",
    imgUrl: "https://sharedimages.fitbank.com.br/sharedimages/logo-FITFABK-512.svg",
  },
  {
    name: "GERU SCD",
    imgUrl: "https://s3.amazonaws.com/prd.asset.platform.open-co.com.br/logo.512x512.svg",
  },
  {
    name: "Getnet",
    imgUrl: "https://site.getnet.com.br/wp-content/uploads/2021/07/logo_reduzido_getnet.svg",
  },
  {
    name: "Hipercard",
    imgUrl: "https://www.itau.com.br/media/dam/m/73230f2ae856f7f0/original/Hipercard.svg",
  },
  {
    name: "Hyundai Financiamentos",
    imgUrl: "https://detigxafctvwc.cloudfront.net/financiamentos/Logo_Hyundai.svg",
  },
  {
    name: "IBIAM",
    imgUrl: "https://www.sulcrediibiam.com.br/sistema/arquivos/arquivos/dc1b85108fc2a8f383dad431c72b55529fa44524.svg",
  },
  {
    name: "Indigo Investimentos",
    imgUrl: "https://www.indigoinvestimentos.com.br/wp-content/uploads/2022/10/novo-logotipo-indigo-roxo.svg",
  },
  {
    name: "InfinitePay",
    imgUrl: "https://auth.infinitepay.io/images/logo.svg",
  },
  {
    name: "InfinitePay - Dados Clientes",
    imgUrl: "https://auth.infinitepay.io/images/logo.svg",
  },
  {
    name: "Iniciador",
    imgUrl: "https://iniciador.com.br/static/images/logo.svg",
  },
  {
    name: "Investimentos BB",
    imgUrl: "https://www.bb.com.br/docs/pub/inst/img/Investimentos_Logo.svg",
  },
  {
    name: "Íon",
    imgUrl: "https://www.itau.com.br/media/dam/m/29448110f8750b19/original/ion.svg",
  },
  {
    name: "Itaú",
    imgUrl: "https://www.itau.com.br/media/dam/m/4ee2c952e1fa91a2/original/Novo_itau.svg",
  },
  {
    name: "Itaú BBA",
    imgUrl: "https://www.itau.com.br/media/dam/m/732cc5b0ed00322f/original/Itau-BBA.svg",
  },
  {
    name: "Itaú Emps",
    imgUrl: "https://www.itau.com.br/media/dam/m/76348de88374de24/original/IU_LOGO_POS_HEX_512X512.svg",
  },
  {
    name: "Itaucard",
    imgUrl: "https://www.itau.com.br/media/dam/m/525c782f2035ba0e/original/Itaucard.svg",
  },
  {
    name: "Iti",
    imgUrl: "https://www.itau.com.br/media/dam/m/3d24ac79b5b4fd5c/original/Iti.svg",
  },
  {
    name: "Iugu Pagamentos",
    imgUrl: "https://ob-logos.s3.amazonaws.com/logo_iugu.svg",
  },
  {
    name: "J17 Sociedade de Crédito",
    imgUrl: "https://j17bank.com.br/images/logo.svg",
  },
  {
    name: "JP Morgan",
    imgUrl: "https://www.jpmorgan.com/content/dam/shared/logos/logo-jpm-opf.svg",
  },
  {
    name: "Klavi",
    imgUrl: "https://cdn.klavi.ai/static/header/logo.svg",
  },
  {
    name: "LISTO",
    imgUrl: "https://imagens.soulisto.com.br/2.svg",
  },
  {
    name: "Losango",
    imgUrl: "https://openbanking.losango.com.br/Openbanking/logo/losango.svg",
  },
  {
    name: "MagaluPay Empresas",
    imgUrl: "https://auth-open-finance.hubfintech.com.br/OB/magalupay_empresas_512.svg",
  },
  {
    name: "MEI Fácil",
    imgUrl: "https://opbk-brasil.s3.sa-east-1.amazonaws.com/meifacil/logo.svg",
  },
  {
    name: "Méliuz",
    imgUrl: "https://staticz.com.br/app/img/strapi/Logo_Meliuz_ee53a8ed76.svg",
  },
  {
    name: "Mercado Pago",
    imgUrl: "https://http2.mlstatic.com/open-banking/assets/logo.svg",
  },
  {
    name: "Midway",
    imgUrl: "https://openfinance.midway.com.br/midway.svg",
  },
  {
    name: "Mobilize Financial Services",
    imgUrl: "https://www.mobilize-fs.com.br/wp-content/uploads/2023/11/logo_mobilize.svg",
  },
  {
    name: "MoneyPlus Auth Server",
    imgUrl: "https://bmp.dbs.moneyp.com.br/bmpmoneyplus.svg",
  },
  {
    name: "Neon",
    imgUrl: "https://opbk-brasil.s3.sa-east-1.amazonaws.com/neon/logo.svg",
  },
  {
    name: "next",
    imgUrl: "https://next.me/_/assets/images/openbanking/logo_next_verde.svg",
  },
  {
    name: "Nubank",
    imgUrl: "https://nuapp.nubank.com.br/open-banking/logo.svg",
  },
  {
    name: "Numbrs",
    imgUrl: "https://numbrs-static-files.s3.sa-east-1.amazonaws.com/numbrs-principal.svg",
  },
  {
    name: "Olé Consignado",
    imgUrl: "https://cms.santander.com.br/sites/WPS/imagem/img-ole-obk/21-08-11_220517_P_logo-ole-open-banking.svg",
  },
  {
    name: "OMNI BANCO SA",
    imgUrl: "https://ob-public-files.s3.amazonaws.com/icone_logo_of.png",
  },
  {
    name: "Orbi Bank",
    imgUrl: "https://openfinance.realizesolucoesfinanceiras.com.br/logo.svg",
  },
  {
    name: "Ótimo SCD",
    imgUrl: "https://authotimoscd.com.br/logo_otimo.svg",
  },
  {
    name: "Ourinvest",
    imgUrl: "https://opb.ourinvest.com.br/imagens/Logo_Horizontal_Dourado.svg",
  },
  {
    name: "Ourocard",
    imgUrl: "https://www.bb.com.br/docs/pub/inst/img/Ourocard.svg",
  },
  {
    name: "PagBank",
    imgUrl: "https://openfinance.api.pagseguro.com/authorization/img/logo_pagbank.svg",
  },
  {
    name: "PagueVeloz",
    imgUrl: "https://www.pagueveloz.com.br/Content/Img/logo.svg",
  },
  {
    name: "PARANÁ BANCO",
    imgUrl: "https://ob-public-files.s3.amazonaws.com/icone_logo_of.png",
  },
  {
    name: "PARATI CFI",
    imgUrl: "https://parati-cfi.com.br/images/logo.svg",
  },
  {
    name: "Pefisa",
    imgUrl: "https://pnbappcartaoprd.blob.core.windows.net/appcartao/OpenBanking/LOGO_PEFISA_Prancheta.svg",
  },
  {
    name: "Pernambucanas",
    imgUrl: "https://pnbappcartaoprd.blob.core.windows.net/appcartao/OpenBanking/LOGO_PNB_Prancheta.svg",
  },
  {
    name: "Pi",
    imgUrl: "https://ob-public-files.s3.amazonaws.com/icone_logo_op.png",
  },
  {
    name: "PicPay",
    imgUrl: "https://picpay.s3.sa-east-1.amazonaws.com/openbanking/picpay-logo-icon-pf.svg",
  },
  {
    name: "PicPay Negócios",
    imgUrl: "https://picpay.s3.sa-east-1.amazonaws.com/openbanking/logo-picpay-empresas.svg",
  },
  {
    name: "Player’s Bank",
    imgUrl: "https://www.itau.com.br/media/dam/m/509ff415966a54da/original/Playersbank.svg",
  },
  {
    name: "Porto Seguro Bank",
    imgUrl: "https://bank.portoseguro.com.br/img/logo_porto_seguro_bank.svg",
  },
  {
    name: "PRT",
    imgUrl: "https://ob-public-files.s3.amazonaws.com/icone_logo_of.png",
  },
  {
    name: "QI SCD",
    imgUrl: "https://storage.googleapis.com/qitech-website-documents/qi_logo_blue.svg",
  },
  {
    name: "Quero-Quero PAG",
    imgUrl: "https://api.queroquero.com.br/webapps/assets/assets/logo/icone_QQPag.svg",
  },
  {
    name: "RANDON",
    imgUrl: "https://bancorandon.com/_assets/images/logo.svg",
  },
  {
    name: "RecargaPay",
    imgUrl: "https://cnt.recarga.com/assets/open-finance/recargapay-color.svg",
  },
  {
    name: "Rede",
    imgUrl: "https://www.itau.com.br/media/dam/m/3ac924f51ddf48dd/original/Rede.svg",
  },
  {
    name: "Rede Celcoin",
    imgUrl: "https://www.celcoin.com.br/img/rede-celcoin-logo.svg",
  },
  {
    name: "Rendimento",
    imgUrl: "https://cdn.rendimento.com.br/open-banking/logo.svg",
  },
  {
    name: "S3 CACEIS Investor Services",
    imgUrl: "https://ob-public-files.s3.amazonaws.com/icone_logo_of.png",
  },
  {
    name: "Safra Empresas",
    imgUrl: "https://www.safra.com.br/shared/assets/img/safra-of.svg",
  },
  {
    name: "Safra Financeira",
    imgUrl: "https://www.safra.com.br/shared/assets/img/safra-financeira-of.svg",
  },
  {
    name: "Safra PF",
    imgUrl: "https://www.safra.com.br/shared/assets/img/safra-of.svg",
  },
  {
    name: "SafraPay",
    imgUrl: "https://www.safra.com.br/shared/assets/img/safrapay-of.svg",
  },
  {
    name: "Santander Cartões Pessoa Física",
    imgUrl: "https://cms.santander.com.br/sites/WPS/imagem/santander_chama/23-10-31_194829_P_santander_chama.svg",
  },
  {
    name: "Santander Cartões Pessoa Jurídica",
    imgUrl: "https://cms.santander.com.br/sites/WPS/imagem/santander_chama/23-10-31_194829_P_santander_chama.svg",
  },
  {
    name: "Santander Corretora Pessoa Física",
    imgUrl: "https://cms.santander.com.br/sites/WPS/imagem/santander_chama/23-10-31_194829_P_santander_chama.svg",
  },
  {
    name: "Santander Corretora Pessoa Jurídica",
    imgUrl: "https://cms.santander.com.br/sites/WPS/imagem/santander_chama/23-10-31_194829_P_santander_chama.svg",
  },
  {
    name: "Santander Crédito Imobiliário Empresas",
    imgUrl: "https://cms.santander.com.br/sites/WPS/imagem/santander_chama/23-10-31_194829_P_santander_chama.svg",
  },
  {
    name: "Santander Crédito Imobiliário Pessoas",
    imgUrl: "https://cms.santander.com.br/sites/WPS/imagem/santander_chama/23-10-31_194829_P_santander_chama.svg",
  },
  {
    name: "Santander Financiamentos",
    imgUrl: "https://www.cliente.santanderfinanciamentos.com.br/portalcliente/logo1.svg",
  },
  {
    name: "SÃO MIGUEL DO OESTE",
    imgUrl: "https://recebe.sulcredi.coop.br/LOGO_SULCREDI_VERDE.svg",
  },
  {
    name: "SEARA",
    imgUrl: "https://ob-public-files.s3.amazonaws.com/icone_logo_of.png",
  },
  {
    name: "SEMEAR OB",
    imgUrl: "https://www.bancosemear.com.br/wp-content/uploads/2023/09/Marca_Banco_Semear_cor_horizontal-3.svg",
  },
  {
    name: "Senff",
    imgUrl: "https://cdn2.senff.com.br/logo_senff_svg.svg",
  },
  {
    name: "Sicoob",
    imgUrl: "https://sicoob-openbanking.s3.sa-east-1.amazonaws.com/icone-sicoob.svg",
  },
  {
    name: "Sicredi",
    imgUrl: "https://www.sicredi.com.br/openbanking/app/assets/images/shared/logo/logo_sicredi_512.svg",
  },
  {
    name: "Sisprime do Brasil",
    imgUrl: "https://www.sisprimedobrasil.com.br/arquivos/logo-sisprime.svg",
  },
  {
    name: "Socinal S.A. CFI",
    imgUrl: "https://ob-public-files.s3.amazonaws.com/icone_logo_of.png",
  },
  {
    name: "STONE PAGAMENTOS S.A.",
    imgUrl: "https://res.cloudinary.com/dunz5zfpt/image/upload/fl_sanitize/v1689799781/STONE-Simbolo-512px.svg",
  },
  {
    name: "Sulcredi Abelardo Luz",
    imgUrl: "https://ibanking.sulcrediab.com.br/open-banking/images/logo.svg",
  },
  {
    name: "SumUp",
    imgUrl: "https://sumup-openbanking-staticfiles.s3.amazonaws.com/logo.svg",
  },
  {
    name: "Superdigital",
    imgUrl: "https://superdigital.com.br/assets/img/img/logo_super_512x512px.svg",
  },
  {
    name: "Superlogica SCD SA",
    imgUrl: "https://recorrencia.superlogica.com/hubfs/Logos/logo-512x512.svg",
  },
  {
    name: "Toro",
    imgUrl: "https://cdn.toroinvestimentos.com.br/corretora/images/openbanking/logo-toro-90x90.svg",
  },
  {
    name: "Travelex",
    imgUrl: "https://www.travelexbank.com.br/wp-content/uploads/2023/09/logo-svg_2.svg",
  },
  {
    name: "Tribanco",
    imgUrl: "https://www.tribanco.com.br/cdn/2023/files/svg/logo-tribanco.svg",
  },
  {
    name: "Trinus SCD",
    imgUrl: "https://trinusinvestimentos.com.br/BaseConhecimento/Imagens/openfinance/Trinus_Investimentos_Negativo.svg",
  },
  {
    name: "U4C",
    imgUrl: "https://static.u4c-iniciador.com.br/logo.svg",
  },
  {
    name: "Uber Conta by Digio",
    imgUrl: "https://www.ubercontabrasil.com.br/logo.svg",
  },
  {
    name: "Unicred",
    imgUrl: "https://unicred.com.br/site/logo_unicred_vertical-margem90px.svg",
  },
  {
    name: "Uniprime Central",
    imgUrl: "https://www.uniprime.com.br/themes/oficial/images/logo-uniprime.svg",
  },
  {
    name: "Uniprime Centro-Oeste do Brasil",
    imgUrl: "https://ob-public-files.s3.amazonaws.com/icone_logo_of.png",
  },
  {
    name: "Uniprime Sul MS",
    imgUrl: "https://ob-public-files.s3.amazonaws.com/icone_logo_of.png",
  },
  {
    name: "Up.p SEP SA",
    imgUrl: "https://mais.upp.com.br/img/logo_blue.svg",
  },
  {
    name: "Uzzipay IP S.A",
    imgUrl: "https://uzzipay.com/wp-content/uploads/2024/01/Uzzipay_logo.svg",
  },
  {
    name: "Volvo Car Financial Services",
    imgUrl: "https://www.cliente.financiamentovolvocar.com.br/portalclientevolvo/logo-volvo.svg",
  },
  {
    name: "Will Bank",
    imgUrl: "https://willbank-openfinance.s3.sa-east-1.amazonaws.com/logo+will-01.svg",
  },
  {
    name: "Woop",
    imgUrl: "https://www.sicredi.com.br/openbanking/app/assets/images/shared/logo/Woop_logo_512.svg",
  },
  {
    name: "ZEMA CFI S/A",
    imgUrl: "https://www.zema.com/file/collections/logobancocentralzemafinanceira.svg",
  },
]
