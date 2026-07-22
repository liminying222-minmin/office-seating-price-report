(() => {
  'use strict';

  const VERSION = 'V55';
  const DATE = '2026-07-22';

  const BRAND_RULES = {
    'Herman Miller': {
      preferred: ['美国'],
      baseNote: '美国为品牌核心零售市场；以美国最低公开常规原价作为基准。',
      general: 'MillerKnoll具跨区域制造与商业网络；具体椅款产地仍需按SKU标签核验，价差还可能来自税态、区域库存、授权渠道和固定配置。'
    },
    'Steelcase': {
      preferred: ['美国'],
      baseNote: '美国为品牌总部与核心零售市场；以美国最低公开常规原价作为基准。',
      general: 'Steelcase采用区域价表；价差还可能来自税态、固定SKU、区域库存、交付服务和主推市场策略。',
      regions: {
        '荷兰': '欧洲任务椅由法国Sarrebourg工厂供应；区域制造与仓配可能降低跨洲成本，另受VAT、配置和区域价表影响。',
        '英国': '欧洲任务椅由法国Sarrebourg工厂供应；区域制造与仓配可能降低跨洲成本，另受VAT、配置和区域价表影响。',
        '比利时/卢森堡': '欧洲任务椅由法国Sarrebourg工厂供应；区域制造与仓配可能降低跨洲成本，另受VAT、配置和区域价表影响。',
        '法国/欧盟': '欧洲任务椅由法国Sarrebourg工厂供应；区域制造与仓配可能降低跨洲成本，另受VAT、配置和区域价表影响。'
      }
    },
    'Haworth': {
      preferred: ['美国'],
      baseNote: '美国为品牌总部及核心零售市场；以美国最低公开常规原价作为基准。',
      general: 'Haworth总部位于美国Holland，并通过全球区域运营与经销网络供货；差异可能来自区域库存、税态、配置、渠道服务及当地竞争。'
    },
    'Humanscale': {
      preferred: ['美国'],
      baseNote: '美国为品牌总部与核心公开零售市场；以美国同系列最低共同基础配置为基准。',
      general: 'Humanscale在美国New Jersey、爱尔兰Dublin及墨西哥Nogales设生产设施；区域供应可能缩短履约，但Featured、Quick Ship、Custom、VAT与配置仍需优先核对。',
      regions: {
        '荷兰': '品牌在爱尔兰Dublin设生产设施，可能缩短欧洲履约；但VAT、固定SKU及定制入口仍可能造成差异。',
        '英国': '品牌在爱尔兰Dublin设生产设施，可能缩短欧洲履约；但VAT、固定SKU及定制入口仍可能造成差异。',
        '法国/欧盟': '品牌在爱尔兰Dublin设生产设施，可能缩短欧洲履约；但VAT、固定SKU及定制入口仍可能造成差异。'
      }
    },
    'Okamura': {
      preferred: ['日本'],
      baseNote: '日本为品牌母国、核心生产与主销市场；以日本最低公开常规原价作为基准。',
      general: 'Okamura在日本设有9个生产基地；海外市场通常增加进口、区域仓配与经销服务，并可能只引入部分固定SKU。'
    },
    'KOKUYO': {
      preferred: ['日本'],
      baseNote: '日本为品牌母国、核心产品与价格市场；以日本有效公开原价作为基准。',
      general: '日本是KOKUYO核心产品与价格市场；海外多采用B2B或项目渠道，报价可能包含交付、安装与服务，且集团海外工厂不等于该椅款当地生产。'
    },
    'Kinnarps': {
      preferred: ['瑞典/全球', '瑞典'],
      baseNote: '瑞典为品牌母国及核心制造市场；六个生产基地均位于瑞典，优先采用瑞典官方公开基础价。',
      general: 'Kinnarps六个生产基地均在瑞典，并以自有Blue Truck体系配送欧洲；海外价差可能来自VAT、经销渠道、运输距离、项目服务与配置差异。',
      regions: {
        '德国': '产品由瑞典生产并经欧洲物流体系配送；德国价格还可能包含VAT、经销利润、固定配置与当地服务。'
      }
    },
    'Wilkhahn': {
      preferred: ['德国'],
      baseNote: '德国Bad Münder为品牌总部及主要生产基地；优先采用德国公开常规原价作为基准。',
      general: 'Wilkhahn在德国Bad Münder、波兰Poznań和澳大利亚Sydney设生产基地；具体SKU是否本地生产需单独核实，价差还受税态、经销与项目服务影响。',
      regions: {
        '澳大利亚': 'Wilkhahn在Sydney设生产基地，部分产品澳洲本地制造可降低长途运输与售后成本；具体SKU仍需核实。'
      }
    },
    'Vitra': {
      preferred: ['德国'],
      baseNote: '德国Weil am Rhein为Vitra主要生产基地及欧洲公开价格核心市场；以德国公开常规原价作为基准。',
      general: 'Vitra总部位于瑞士，主要生产基地包括德国Weil am Rhein、日本Sugito和匈牙利Szombathely；地区价差可能来自产地、跨区供应、渠道、税态和设计品牌定位。',
      regions: {
        '美国': '德国Weil am Rhein为主要生产基地；美国市场可能增加跨区供应、库存、经销服务与进口品牌定位成本。'
      }
    },
    'Interstuhl': {
      preferred: ['德国'],
      baseNote: '德国Meßstetten-Tieringen为品牌总部、研发及高制造深度核心基地；以德国公开常规原价作为基准。',
      general: '产品以德国Meßstetten-Tieringen核心制造体系为基础；海外价格可能叠加VAT、运输、经销、项目服务及当地固定配置差异。'
    }
  };

  const css = `
    .audit2-slide .audit2-strip span:last-child{font-weight:700;color:#171714}
    .audit2-slide .reason-line{font-size:10px!important;line-height:1.28!important;max-height:3.9em;overflow:hidden;display:block}
    .audit2-slide .reason-line b{color:#dc542c}
    .audit2-slide .price-rel{margin-top:auto!important;min-height:35px!important;padding-top:5px!important;background:#fff;position:relative;z-index:2}
    .audit2-slide .price-rel-top{display:flex!important;justify-content:space-between!important;align-items:center!important;line-height:1!important;min-height:15px}
    .audit2-slide .price-rel-price,.audit2-slide .price-rel-delta{font-size:11px!important;white-space:nowrap}
    .audit2-slide .price-rel-track{height:7px!important;position:relative!important;margin-top:5px!important;background:#ddd9d1!important;overflow:visible!important}
    .audit2-slide .price-rel-fill{height:100%!important;display:block!important;background:#8c8982!important}
    .audit2-slide .price-rel.is-high .price-rel-fill{background:#dc542c!important}
    .audit2-slide .price-rel.is-base .price-rel-fill{background:#171714!important}
    .audit2-slide .price-rel-base{position:absolute!important;top:-3px!important;width:2px!important;height:13px!important;background:#171714!important;transform:translateX(-1px)}
    .audit2-slide .audit2-cell{grid-template-rows:auto auto auto auto auto minmax(0,1fr) 38px!important;overflow:hidden!important}
    .audit2-slide .meta{min-height:0!important;overflow:hidden!important}
    .audit2-slide .audit2-product .proc{white-space:normal!important;line-height:1.15!important}
    .baseline-audit-tag{display:inline-block;margin-left:5px;padding:1px 4px;border:1px solid #dc542c;color:#dc542c;font-size:8px;font-weight:700;vertical-align:middle}
  `;

  function normalize(s) {
    return (s || '').replace(/\s+/g, '').replace(/[：:]/g, '').toLowerCase();
  }

  function getBrand(slide) {
    const title = slide.querySelector('header h2')?.textContent || '';
    return Object.keys(BRAND_RULES).find(name => normalize(title).includes(normalize(name))) || null;
  }

  function rowCells(product) {
    const cells = [];
    let node = product.nextElementSibling;
    while (node && !node.classList.contains('audit2-product')) {
      if (node.classList.contains('audit2-cell')) cells.push(node);
      node = node.nextElementSibling;
    }
    return cells;
  }

  function numericUsd(cell) {
    const v = Number(cell.dataset.usd);
    return Number.isFinite(v) && v > 0 ? v : null;
  }

  function countryOf(cell) {
    return (cell.querySelector('.country')?.textContent || '').trim();
  }

  function fmtUsd(v) {
    return '$' + Math.round(v).toLocaleString('en-US');
  }

  function ensurePriceRel(cell) {
    let rel = cell.querySelector('.price-rel');
    if (!rel) {
      rel = document.createElement('div');
      rel.className = 'price-rel';
      rel.innerHTML = '<div class="price-rel-top"><span class="price-rel-price"></span><b class="price-rel-delta"></b></div><div class="price-rel-track"><i class="price-rel-fill"></i><em class="price-rel-base"></em></div>';
      cell.appendChild(rel);
    }
    return rel;
  }

  function chooseBase(cells, rule) {
    const valid = cells.filter(c => numericUsd(c));
    for (const preferred of rule.preferred) {
      const found = valid.find(c => normalize(countryOf(c)).includes(normalize(preferred)));
      if (found) return { cell: found, preferred: true };
    }
    return valid.length ? { cell: valid[0], preferred: false } : { cell: null, preferred: false };
  }

  function reasonFor(brand, country, isBase, preferredBase, hasPrice) {
    const rule = BRAND_RULES[brand];
    if (!hasPrice) return '当地采用项目/经销报价，可能包含交付、安装与服务；无公开结算价，不参与价差。';
    if (isBase) return preferredBase ? rule.baseNote : `母国/核心市场无有效公开价，暂以${country}最低可核常规价作为可用基准。`;
    return rule.regions?.[country] || rule.general;
  }

  function updateReason(cell, text, isBase) {
    const meta = cell.querySelector('.meta');
    if (!meta) return;
    let line = meta.querySelector('.reason-line');
    if (!line) {
      line = document.createElement('span');
      line.className = 'reason-line';
      meta.appendChild(line);
    }
    line.classList.toggle('is-base', isBase);
    line.innerHTML = `<b>${isBase ? '基准说明：' : '可能原因：'}</b>${text}`;
  }

  function updateRow(product, brand, rule) {
    const cells = rowCells(product);
    const valid = cells.filter(c => numericUsd(c));
    const picked = chooseBase(cells, rule);
    if (!picked.cell) {
      cells.forEach(c => updateReason(c, reasonFor(brand, countryOf(c), false, false, false), false));
      return;
    }

    const baseCell = picked.cell;
    const base = numericUsd(baseCell);
    const ratios = valid.map(c => numericUsd(c) / base);
    const maxRatio = Math.max(1, ...ratios) * 1.04;
    const baseMarker = Math.min(96, 100 / maxRatio);

    let minCell = valid[0];
    let maxCell = valid[0];
    valid.forEach(c => {
      if (numericUsd(c) < numericUsd(minCell)) minCell = c;
      if (numericUsd(c) > numericUsd(maxCell)) maxCell = c;
    });

    const deltas = valid.map(c => Math.round((numericUsd(c) / base - 1) * 100));
    const minDelta = Math.min(...deltas);
    const maxDelta = Math.max(...deltas);
    const baseCountry = countryOf(baseCell);

    const proc = product.querySelector('.proc.market-gap, .market-gap');
    if (proc) proc.textContent = `${picked.preferred ? '基准' : '可用基准'} ${baseCountry} ${fmtUsd(base)}`;
    const route = product.querySelector('.compare-route');
    if (route) route.textContent = `相对区间 ${minDelta >= 0 ? '+' : ''}${minDelta}% ～ ${maxDelta >= 0 ? '+' : ''}${maxDelta}%`;
    const small = product.querySelector('small');
    if (small) small.textContent = `最低 ${countryOf(minCell)} ${fmtUsd(numericUsd(minCell))}｜最高 ${countryOf(maxCell)} ${fmtUsd(numericUsd(maxCell))}`;

    cells.forEach(cell => {
      const usd = numericUsd(cell);
      const country = countryOf(cell);
      const isBase = cell === baseCell;
      updateReason(cell, reasonFor(brand, country, isBase, picked.preferred, !!usd), isBase);
      if (!usd) return;

      const delta = Math.round((usd / base - 1) * 100);
      const rel = ensurePriceRel(cell);
      rel.classList.remove('is-base', 'is-high', 'is-low');
      rel.classList.add(isBase ? 'is-base' : delta > 0 ? 'is-high' : delta < 0 ? 'is-low' : 'is-base');
      rel.querySelector('.price-rel-price').textContent = fmtUsd(usd);
      rel.querySelector('.price-rel-delta').textContent = isBase ? (picked.preferred ? '基准' : '可用基准') : `${delta > 0 ? '+' : ''}${delta}%`;
      rel.querySelector('.price-rel-fill').style.width = `${Math.max(3, Math.min(100, usd / base / maxRatio * 100)).toFixed(2)}%`;
      rel.querySelector('.price-rel-base').style.left = `${baseMarker.toFixed(2)}%`;
    });
  }

  function run() {
    const style = document.createElement('style');
    style.id = 'v55-baseline-network-style';
    style.textContent = css;
    document.head.appendChild(style);

    const audit = [];
    document.querySelectorAll('.audit2-slide').forEach(slide => {
      const brand = getBrand(slide);
      if (!brand) return;
      const rule = BRAND_RULES[brand];
      const strip = slide.querySelector('.audit2-strip span:last-child');
      if (strip) strip.textContent = '原因判断：配置/税态 → 制造与区域仓配 → 运输枢纽 → 渠道/主推市场 → 竞品与汇率';
      slide.querySelectorAll('.audit2-product').forEach(product => updateRow(product, brand, rule));
      audit.push(brand);
    });

    document.querySelectorAll('footer span:last-child').forEach(el => {
      el.textContent = el.textContent.replace(/V\d+/g, VERSION).replace(/2026-07-\d{2}/g, DATE);
    });
    document.querySelectorAll('*').forEach(el => {
      if (el.children.length === 0 && /V54\b/.test(el.textContent || '')) el.textContent = el.textContent.replace(/V54\b/g, VERSION);
    });

    window.__V55_BASELINE_AUDIT__ = {
      version: VERSION,
      auditedBrands: [...new Set(audit)],
      rule: '母国/核心生产公开市场优先；无有效公开价时使用可用基准并明确标注'
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
})();
