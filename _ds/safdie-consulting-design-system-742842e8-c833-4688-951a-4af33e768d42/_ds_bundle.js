/* @ds-bundle: {"format":4,"namespace":"SafdieConsultingDesignSystem_742842","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Placeholder","sourcePath":"components/core/Placeholder.jsx"},{"name":"SectionHeader","sourcePath":"components/core/SectionHeader.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Accordion","sourcePath":"components/disclosure/Accordion.jsx"},{"name":"BookingEmbed","sourcePath":"components/embeds/BookingEmbed.jsx"},{"name":"CookieBanner","sourcePath":"components/feedback/CookieBanner.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"CaseStudy","sourcePath":"ui_kits/website/CaseStudy.jsx"},{"name":"Home","sourcePath":"ui_kits/website/Home.jsx"},{"name":"Privacy","sourcePath":"ui_kits/website/Privacy.jsx"},{"name":"Site","sourcePath":"ui_kits/website/Site.jsx"},{"name":"NAV","sourcePath":"ui_kits/website/content.js"},{"name":"HERO","sourcePath":"ui_kits/website/content.js"},{"name":"NUMBERS","sourcePath":"ui_kits/website/content.js"},{"name":"PATHS","sourcePath":"ui_kits/website/content.js"},{"name":"TIERS_INTRO","sourcePath":"ui_kits/website/content.js"},{"name":"TIERS","sourcePath":"ui_kits/website/content.js"},{"name":"TIERS_CLOSER","sourcePath":"ui_kits/website/content.js"},{"name":"ENGAGEMENT","sourcePath":"ui_kits/website/content.js"},{"name":"FIT","sourcePath":"ui_kits/website/content.js"},{"name":"CASES","sourcePath":"ui_kits/website/content.js"},{"name":"ABOUT","sourcePath":"ui_kits/website/content.js"},{"name":"FAQ","sourcePath":"ui_kits/website/content.js"},{"name":"CONTACT","sourcePath":"ui_kits/website/content.js"},{"name":"FOOTER","sourcePath":"ui_kits/website/content.js"},{"name":"About","sourcePath":"ui_kits/website/sections/About.jsx"},{"name":"Cases","sourcePath":"ui_kits/website/sections/Cases.jsx"},{"name":"Contact","sourcePath":"ui_kits/website/sections/Contact.jsx"},{"name":"Engagement","sourcePath":"ui_kits/website/sections/Engagement.jsx"},{"name":"Faq","sourcePath":"ui_kits/website/sections/Faq.jsx"},{"name":"Hero","sourcePath":"ui_kits/website/sections/Hero.jsx"},{"name":"HowWeWork","sourcePath":"ui_kits/website/sections/HowWeWork.jsx"},{"name":"Numbers","sourcePath":"ui_kits/website/sections/Numbers.jsx"},{"name":"Problems","sourcePath":"ui_kits/website/sections/Problems.jsx"}],"sourceHashes":{"components/core/Button.jsx":"97bb44da409a","components/core/Card.jsx":"3af97e28e88f","components/core/Eyebrow.jsx":"fc9494bcf579","components/core/Logo.jsx":"7e833e96219b","components/core/Placeholder.jsx":"9532b738ca6b","components/core/SectionHeader.jsx":"a7eaa259f5b9","components/core/Stat.jsx":"eebf1e76ebd5","components/core/Tag.jsx":"916a039e5886","components/disclosure/Accordion.jsx":"86bf7d802b97","components/embeds/BookingEmbed.jsx":"b1a6b9bc4808","components/feedback/CookieBanner.jsx":"532ac48899b8","components/navigation/Footer.jsx":"723e495f92a2","components/navigation/NavBar.jsx":"5e9f73198042","ui_kits/website/CaseStudy.jsx":"c170abb2651f","ui_kits/website/Home.jsx":"5a654d2d1112","ui_kits/website/Privacy.jsx":"0d3bb2ca1af9","ui_kits/website/Site.jsx":"224a9fa2eac4","ui_kits/website/content.js":"346b3f785427","ui_kits/website/sections/About.jsx":"155c6f286e6c","ui_kits/website/sections/Cases.jsx":"2d743ac80308","ui_kits/website/sections/Contact.jsx":"3411122fc51e","ui_kits/website/sections/Engagement.jsx":"1ef29be35fb6","ui_kits/website/sections/Faq.jsx":"5f0743faf297","ui_kits/website/sections/Hero.jsx":"462ef384f0a9","ui_kits/website/sections/HowWeWork.jsx":"87d4e9e63b5a","ui_kits/website/sections/Numbers.jsx":"72de814e41af","ui_kits/website/sections/Problems.jsx":"309b3f06aa84"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SafdieConsultingDesignSystem_742842 = window.SafdieConsultingDesignSystem_742842 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Square-cornered action. No radius, no shadow, no lift on hover. */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  as: Tag = 'button',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const pad = size === 'sm' ? '11px 20px' : '16px 30px';
  const fs = size === 'sm' ? '14px' : '15px';
  const variants = {
    primary: {
      background: hover && !disabled ? 'var(--sc-ultramarine-deep)' : 'var(--surface-accent)',
      color: 'var(--text-on-accent)',
      border: '1px solid transparent'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: `1px solid ${hover && !disabled ? 'var(--sc-ink)' : 'var(--sc-ink-22)'}`
    },
    inverse: {
      background: hover && !disabled ? 'var(--sc-white)' : 'var(--sc-paper)',
      color: 'var(--sc-ink)',
      border: '1px solid transparent'
    },
    quiet: {
      background: 'transparent',
      color: hover && !disabled ? 'var(--link-hover)' : 'var(--link)',
      border: '1px solid transparent',
      padding: 0,
      borderBottom: `1px solid ${hover && !disabled ? 'var(--sc-ink)' : 'rgba(27,77,193,0.4)'}`
    }
  };
  const disabledStyle = disabled ? {
    background: 'transparent',
    color: 'var(--text-muted)',
    border: '1px solid var(--sc-ink-12)',
    cursor: 'not-allowed'
  } : null;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    disabled: Tag === 'button' ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-2)',
      padding: pad,
      fontFamily: 'var(--font-sans)',
      fontSize: fs,
      fontWeight: 'var(--weight-semibold)',
      lineHeight: 1.2,
      borderRadius: 'var(--radius-control)',
      boxShadow: 'var(--shadow-none)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      textDecoration: 'none',
      transition: 'var(--transition-state)',
      ...variants[variant],
      ...disabledStyle,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** White surface, hairline border, zero radius, no shadow. */
function Card({
  children,
  tone = 'light',
  accent = false,
  padding = 40,
  style,
  ...rest
}) {
  const tones = {
    light: {
      background: 'var(--surface-card)',
      color: 'var(--text-body)',
      border: '1px solid var(--sc-ink-16)'
    },
    inverse: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-inverse)',
      border: '1px solid var(--sc-ink)'
    },
    fill: {
      background: 'var(--surface-fill)',
      color: 'var(--text-body)',
      border: '1px solid transparent'
    }
  };
  const top = accent ? {
    borderTop: `var(--border-accent) solid ${tone === 'inverse' ? 'var(--sc-haze)' : 'var(--surface-accent)'}`
  } : null;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding,
      borderRadius: 'var(--radius-surface)',
      boxShadow: 'var(--shadow-none)',
      // keeps the accent top rule inside the corner when radius is non-zero
      backgroundClip: 'padding-box',
      boxSizing: 'border-box',
      ...tones[tone],
      ...top,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Mono uppercase label. The system's standard section/meta marker. */
function Eyebrow({
  children,
  tone = 'accent',
  as: Tag = 'div',
  style,
  ...rest
}) {
  const color = {
    accent: 'var(--text-accent)',
    inverse: 'var(--text-accent-inverse)',
    muted: 'var(--text-muted)',
    onInverse: 'var(--sc-paper-45)'
  }[tone];
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--size-eyebrow)',
      lineHeight: 'var(--lh-eyebrow)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The S/C slash monogram, optionally locked up with the wordmark. */
function Logo({
  size = 40,
  tone = 'ink',
  wordmark = false,
  style,
  ...rest
}) {
  const tones = {
    ink: {
      bg: 'var(--sc-ink)',
      fg: 'var(--sc-paper)',
      slash: 'var(--sc-haze)',
      word: 'var(--text-body)'
    },
    paper: {
      bg: 'var(--sc-paper)',
      fg: 'var(--sc-ink)',
      slash: 'var(--sc-ultramarine)',
      word: 'var(--text-on-inverse)'
    },
    accent: {
      bg: 'var(--surface-accent)',
      fg: 'var(--sc-white)',
      slash: 'rgba(255,255,255,0.6)',
      word: 'var(--text-body)'
    }
  };
  const t = tones[tone];
  const dropC = size <= 16;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: size * 0.4,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      background: t.bg,
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: size * (dropC ? 0.62 : 0.4),
      fontWeight: 'var(--weight-medium)',
      letterSpacing: '-0.02em',
      lineHeight: 1,
      color: t.fg
    }
  }, "S", /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.slash
    }
  }, "/"), dropC ? '' : 'C')), wordmark ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size * 0.44,
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: '-0.025em',
      color: t.word,
      whiteSpace: 'nowrap'
    }
  }, "Safdie Consulting") : null);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Placeholder.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Diagonal-hatch stand-in that names what belongs there. Never a grey box. */
function Placeholder({
  label,
  tone = 'light',
  ratio,
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  const stripe = inverse ? 'rgba(246,247,249,0.09)' : 'var(--sc-ink-08)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: `repeating-linear-gradient(135deg, ${stripe} 0 10px, transparent 10px 20px)`,
      border: `1px solid ${inverse ? 'var(--rule-inverse)' : 'var(--sc-ink-16)'}`,
      borderRadius: 'var(--radius-surface)',
      aspectRatio: ratio,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-3)',
      textAlign: 'center',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-mono)',
      fontSize: '12.5px',
      lineHeight: 1.6,
      color: inverse ? 'var(--sc-paper-45)' : 'var(--text-muted)',
      ...style
    }
  }, rest), label);
}
Object.assign(__ds_scope, { Placeholder });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Placeholder.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Number + H2 + optional right-aligned note, all on one hairline. */
function SectionHeader({
  number,
  title,
  note,
  tone = 'light',
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--space-3)',
      paddingBottom: 22,
      borderBottom: `1px solid ${inverse ? 'var(--rule-inverse)' : 'var(--rule)'}`,
      flexWrap: 'wrap',
      ...style
    }
  }, rest), number ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--size-eyebrow)',
      letterSpacing: 'var(--track-eyebrow)',
      color: inverse ? 'var(--text-accent-inverse)' : 'var(--text-accent)'
    }
  }, number) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--size-h2)',
      lineHeight: 'var(--lh-h2)',
      letterSpacing: 'var(--track-h2)',
      fontWeight: 'var(--weight-semibold)',
      color: inverse ? 'var(--text-on-inverse)' : 'var(--text-body)'
    }
  }, title), note ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      maxWidth: 520,
      textAlign: 'right',
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--lh-small)',
      color: inverse ? 'var(--text-on-inverse-2)' : 'var(--text-secondary)'
    }
  }, note) : null);
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Large figure with a label and a mandatory source line. */
function Stat({
  value,
  unit,
  label,
  source,
  tone = 'light',
  size = 'md',
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  const fs = size === 'lg' ? 96 : 46;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs,
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: '-0.045em',
      lineHeight: 0.9,
      color: inverse ? 'var(--text-on-inverse)' : 'var(--text-body)'
    }
  }, value, unit ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: fs * 0.47,
      color: inverse ? 'var(--sc-haze)' : 'var(--text-accent)'
    }
  }, unit) : null), label ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--size-small)',
      lineHeight: 1.4,
      marginTop: 14,
      color: inverse ? 'var(--text-on-inverse-2)' : 'var(--text-secondary)'
    }
  }, label) : null, source ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '11.5px',
      marginTop: 10,
      color: inverse ? 'var(--sc-paper-45)' : 'var(--text-muted)'
    }
  }, source) : null);
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small mono chip for tier codes, durations, and status. */
function Tag({
  children,
  tone = 'fill',
  style,
  ...rest
}) {
  const tones = {
    fill: {
      background: 'var(--surface-fill)',
      color: 'var(--sc-ultramarine-deep)',
      border: '1px solid transparent'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid var(--sc-ink-22)'
    },
    ink: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-accent-inverse)',
      border: '1px solid transparent'
    },
    positive: {
      background: 'transparent',
      color: 'var(--sc-positive)',
      border: '1px solid var(--sc-positive)'
    },
    risk: {
      background: 'transparent',
      color: 'var(--sc-risk)',
      border: '1px solid var(--sc-risk)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '7px 14px',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      lineHeight: 1,
      borderRadius: 'var(--radius-control)',
      whiteSpace: 'nowrap',
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/disclosure/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Keyboard-accessible disclosure list. A row is a title + one-line hook; clicking
 * or pressing Enter/Space expands the fuller explanation below it.
 */
function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpen = [],
  tone = 'light',
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(() => new Set(defaultOpen));
  const inverse = tone === 'inverse';
  const toggle = id => {
    setOpen(prev => {
      const next = allowMultiple ? new Set(prev) : new Set();
      if (prev.has(id)) next.delete(id);else next.add(id);
      return next;
    });
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderTop: `1px solid ${inverse ? 'var(--rule-inverse)' : 'var(--rule)'}`,
      ...style
    }
  }, rest), items.map(item => {
    const isOpen = open.has(item.id);
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      style: {
        borderBottom: `1px solid ${inverse ? 'var(--rule-inverse)' : 'var(--rule-soft)'}`
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-expanded": isOpen,
      "aria-controls": `panel-${item.id}`,
      id: `trigger-${item.id}`,
      onClick: () => toggle(item.id),
      style: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto',
        gap: 'var(--space-3)',
        alignItems: 'center',
        textAlign: 'left',
        padding: '24px 0',
        background: 'none',
        border: 0,
        cursor: 'pointer',
        font: 'inherit',
        color: 'inherit'
      }
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 'var(--size-h3)',
        lineHeight: 1.2,
        letterSpacing: 'var(--track-h3)',
        fontWeight: 'var(--weight-semibold)'
      }
    }, item.title), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        marginTop: 8,
        fontSize: 'var(--size-small)',
        lineHeight: 'var(--lh-small)',
        color: inverse ? 'var(--text-on-inverse-2)' : 'var(--text-secondary)'
      }
    }, item.hook)), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: 'relative',
        width: 16,
        height: 16,
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 7,
        left: 0,
        width: 16,
        height: 2,
        background: 'var(--surface-accent)',
        borderRadius: 2
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 0,
        left: 7,
        width: 2,
        height: 16,
        background: 'var(--surface-accent)',
        borderRadius: 2,
        transform: isOpen ? 'scaleY(0)' : 'scaleY(1)',
        transition: 'transform var(--duration-base) var(--ease)'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      id: `panel-${item.id}`,
      role: "region",
      "aria-labelledby": `trigger-${item.id}`,
      hidden: !isOpen,
      style: {
        paddingBottom: isOpen ? 28 : 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--measure-body)',
        fontSize: 'var(--size-body)',
        lineHeight: 'var(--lh-body)',
        color: inverse ? 'var(--text-on-inverse-2)' : 'var(--text-secondary)',
        borderLeft: 'var(--border-accent) solid var(--surface-accent)',
        paddingLeft: 22
      }
    }, item.body)));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/disclosure/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/embeds/BookingEmbed.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tidycal booking, embedded inline rather than linked out — the locked decision,
 * to remove friction at the highest-intent moment in the funnel.
 *
 * The plain link renders ABOVE the iframe as a fallback, so the booking path
 * still works if the embed is blocked, the plan does not support iframes, or
 * the visitor's browser refuses third-party frames.
 */
function BookingEmbed({
  url,
  height = 620,
  label = 'Book 30 minutes',
  privacyNote,
  privacyHref = '/privacy',
  onBooked,
  placeholder = false,
  style,
  ...rest
}) {
  const [loaded, setLoaded] = React.useState(false);

  // Tidycal posts a message on a completed booking — the analytics conversion event.
  React.useEffect(() => {
    if (!onBooked) return;
    const handler = e => {
      if (typeof e.data === 'string' && e.data.includes('tidycal') && e.data.includes('booking')) onBooked(e.data);
      if (e.data && e.data.type && String(e.data.type).toLowerCase().includes('booking')) onBooked(e.data);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [onBooked]);
  const shown = url.replace(/^https?:\/\//, '');
  return /*#__PURE__*/React.createElement("div", _extends({
    style: style
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '11.5px',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-accent)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontFamily: 'var(--font-mono)',
      fontSize: '13px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: url,
    target: "_blank",
    rel: "noreferrer"
  }, shown)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginTop: 16,
      height,
      border: '1px solid var(--rule)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-surface)',
      overflow: 'hidden'
    }
  }, placeholder ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 'var(--space-3)',
      background: 'repeating-linear-gradient(135deg, var(--sc-ink-08) 0 10px, transparent 10px 20px)',
      fontFamily: 'var(--font-mono)',
      fontSize: '12.5px',
      lineHeight: 1.7,
      color: 'var(--text-muted)'
    }
  }, "Tidycal embed", /*#__PURE__*/React.createElement("br", null), "pending plan confirmation") : /*#__PURE__*/React.createElement(React.Fragment, null, !loaded ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: '12.5px',
      color: 'var(--text-muted)'
    }
  }, "Loading the calendar\u2026") : null, /*#__PURE__*/React.createElement("iframe", {
    src: url,
    title: label,
    onLoad: () => setLoaded(true),
    style: {
      width: '100%',
      height: '100%',
      border: 0,
      display: 'block',
      position: 'relative'
    }
  }))), privacyNote ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontSize: '13px',
      lineHeight: 1.5,
      color: 'var(--text-muted)',
      maxWidth: 520
    }
  }, privacyNote, " ", /*#__PURE__*/React.createElement("a", {
    href: privacyHref
  }, "Privacy policy"), ".") : null);
}
Object.assign(__ds_scope, { BookingEmbed });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/embeds/BookingEmbed.jsx", error: String((e && e.message) || e) }); }

// components/feedback/CookieBanner.jsx
try { (() => {
const KEY = 'cookie_consent';

/**
 * GDPR consent gate. Analytics must not load unless this returns 'granted' —
 * gating the tag, not blocking it after the fact, is what makes it compliant.
 */
function CookieBanner({
  storageKey = KEY,
  forceOpen = false,
  onChange,
  privacyHref = '#privacy'
}) {
  const [choice, setChoice] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    let stored = null;
    try {
      stored = window.localStorage.getItem(storageKey);
    } catch (e) {/* private mode */}
    setChoice(stored);
    setOpen(forceOpen || !stored);
  }, [storageKey, forceOpen]);
  const decide = value => {
    try {
      window.localStorage.setItem(storageKey, value);
    } catch (e) {/* private mode */}
    setChoice(value);
    setOpen(false);
    onChange?.(value);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-label": "Cookie settings",
    style: {
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 50,
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-inverse)',
      borderTop: 'var(--border-accent) solid var(--surface-accent)',
      padding: '22px var(--page-margin)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-4)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 620,
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--lh-small)',
      color: 'var(--text-on-inverse-2)'
    }
  }, "We use Google Analytics to understand how this site is used. It loads only if you accept.", ' ', /*#__PURE__*/React.createElement("a", {
    href: privacyHref,
    style: {
      color: 'var(--text-accent-inverse)'
    }
  }, "Privacy policy"), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "inverse",
    onClick: () => decide('granted')
  }, choice === 'granted' ? 'Keep accepted' : 'Accept'), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "secondary",
    style: {
      color: 'var(--text-on-inverse)',
      borderColor: 'var(--sc-paper-45)'
    },
    onClick: () => decide('denied')
  }, choice === 'denied' ? 'Keep declined' : 'Decline')));
}
Object.assign(__ds_scope, { CookieBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/CookieBanner.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Ink footer: mark, strapline, contact, and link columns. */
function Footer({
  columns = [],
  contact,
  strapline,
  note,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-inverse)',
      padding: 'var(--space-6) var(--page-margin)',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-3)',
      maxWidth: 320
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    size: 44,
    tone: "paper"
  }), strapline ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--size-small)',
      lineHeight: 1.5,
      color: 'var(--text-on-inverse-2)'
    }
  }, strapline) : null, contact ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      lineHeight: 1.8,
      color: 'var(--text-on-inverse-2)'
    }
  }, contact) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      flexWrap: 'wrap'
    }
  }, columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title,
    style: {
      display: 'grid',
      gap: 12,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--sc-paper-45)'
    }
  }, col.title), col.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: String(l.label),
    href: l.href || '#',
    onClick: e => {
      if (l.onClick) {
        e.preventDefault();
        l.onClick();
      }
    },
    style: {
      fontSize: '15px',
      color: 'var(--text-on-inverse-2)'
    }
  }, l.label)))))), note ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)',
      paddingTop: 'var(--space-3)',
      borderTop: '1px solid var(--rule-inverse)',
      fontFamily: 'var(--font-mono)',
      fontSize: '11.5px',
      color: 'var(--sc-paper-45)'
    }
  }, note) : null);
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Site header. Sticky on scroll so the CTA stays visible; collapses to a
 * hamburger below `collapseAt`, with the CTA still shown when collapsed.
 */
function NavBar({
  links = [],
  cta,
  onNavigate,
  active,
  tone = 'light',
  sticky = true,
  collapseAt = 1080,
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  const [narrow, setNarrow] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(([e]) => setNarrow(e.contentRect.width < collapseAt));
    ro.observe(el);
    return () => ro.disconnect();
  }, [collapseAt]);
  const linkStyle = isActive => ({
    fontSize: '14px',
    fontWeight: 'var(--weight-medium)',
    color: isActive ? inverse ? 'var(--text-on-inverse)' : 'var(--text-body)' : inverse ? 'var(--text-on-inverse-2)' : 'var(--text-secondary)',
    borderBottom: isActive ? '1px solid var(--surface-accent)' : '1px solid transparent',
    paddingBottom: 2,
    transition: 'var(--transition-state)',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  });
  const go = (e, id) => {
    if (!onNavigate) return;
    e.preventDefault();
    setMenu(false);
    onNavigate(id);
  };
  return /*#__PURE__*/React.createElement("header", _extends({
    ref: ref,
    style: {
      position: sticky ? 'sticky' : 'static',
      top: 0,
      zIndex: 40,
      borderBottom: `1px solid ${inverse ? 'var(--rule-inverse)' : 'var(--rule)'}`,
      background: inverse ? 'var(--surface-inverse)' : 'var(--surface-page)',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-4)',
      padding: '20px var(--page-margin)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    onClick: e => go(e, 'top'),
    style: {
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    size: 34,
    tone: inverse ? 'paper' : 'ink',
    wordmark: true
  })), narrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, cta ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    onClick: cta.onClick,
    as: cta.href ? 'a' : 'button',
    href: cta.href
  }, cta.label) : null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-expanded": menu,
    "aria-label": "Menu",
    onClick: () => setMenu(m => !m),
    style: {
      width: 34,
      height: 34,
      display: 'grid',
      alignContent: 'center',
      gap: 5,
      background: 'none',
      border: 0,
      cursor: 'pointer',
      padding: 0
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'block',
      height: 2,
      width: 22,
      borderRadius: 2,
      background: inverse ? 'var(--sc-paper)' : 'var(--sc-ink)'
    }
  })))) : /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id || l.label,
    href: l.href || `#${l.id}`,
    onClick: e => go(e, l.id || l.label),
    style: linkStyle(active === (l.id || l.label))
  }, l.label)), cta ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    onClick: cta.onClick,
    as: cta.href ? 'a' : 'button',
    href: cta.href,
    style: {
      background: 'var(--sc-ink)'
    }
  }, cta.label) : null)), narrow && menu ? /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'grid',
      padding: '0 var(--page-margin) 20px',
      borderTop: `1px solid ${inverse ? 'var(--rule-inverse)' : 'var(--rule-soft)'}`
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id || l.label,
    href: l.href || `#${l.id}`,
    onClick: e => go(e, l.id || l.label),
    style: {
      ...linkStyle(active === (l.id || l.label)),
      padding: '14px 0',
      borderBottom: `1px solid ${inverse ? 'var(--rule-inverse)' : 'var(--rule-soft)'}`,
      fontSize: '16px'
    }
  }, l.label))) : null);
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/content.js
try { (() => {
/**
 * Site copy for safdieconsulting.com.
 *
 * SOURCE OF TRUTH: Notion — "🌐 Website — Structure & Content", decisions locked Sept 18 2026.
 * Do not rewrite this copy from scratch. It has been reviewed and signed off by Andrés.
 * Voice: "we" throughout; third person ("Andrés", "he") in the bio and the case studies only.
 */

const NAV = [{
  id: 'problems',
  label: 'Problems We Solve'
}, {
  id: 'how',
  label: 'How We Work'
}, {
  id: 'cases',
  label: 'Case Studies'
}, {
  id: 'about',
  label: 'About'
}, {
  id: 'faq',
  label: 'FAQ'
}, {
  id: 'contact',
  label: 'Contact'
}];
const HERO = {
  headline: "When your product architecture can't hold the next stage of growth.",
  sub: 'HR Tech advisory for companies expanding into new countries or scaling up to enterprise-grade volume, backed by 25+ years building payroll, HCM, and EOR platforms across dozens of countries.',
  bullets: ['Product, platform and data architecture diagnosis', 'Process and team assessment', 'AI enablement'],
  closer: 'We diagnose what\u2019s breaking. We help your teams build the fix.'
};
const NUMBERS = [{
  value: '43',
  unit: '',
  label: 'Countries in a true Global Payroll Engine'
}, {
  value: '100',
  unit: '+',
  label: 'Countries: EOR platform build'
}, {
  value: '$200',
  unit: 'M',
  label: 'Series B supported'
}, {
  value: '40',
  unit: '%',
  label: 'Engineering cost reduction through AI-driven transformation'
}];
const PATHS = [{
  id: 'geographic',
  title: 'Geographic Expansion',
  strap: 'For teams taking their product into new countries.',
  intro: 'A product\u2019s data architecture built for one market rarely survives the jump into three, ten, or fifty more. Currency, labor law, and language assumptions baked into a single-country build have to be re-architected, not patched.',
  tiles: [{
    id: 'global-scalability',
    title: 'Global scalability',
    hook: 'Data models built for one market don\u2019t hold when you expand into new countries.',
    body: 'When companies expand into multiple countries, a single-country architecture has to be re-thought, not patched, to support multi-language and multi-jurisdiction requirements without duplicating the entire system per country.'
  }]
}, {
  id: 'enterprise',
  title: 'Enterprise Scale-Up',
  strap: 'For teams taking their product from a small deployment to enterprise-grade volume.',
  intro: 'Performance, integrations, and data reconciliation that work for a few thousand records often fail under millions, and that failure shows up in production, not in testing.',
  tiles: [{
    id: 'integrations',
    title: 'Enterprise integrations',
    hook: 'Simple ingestion pipelines don\u2019t survive contact with enterprise-grade systems.',
    body: 'A local or early-stage product usually connects through a simplified file or a lightweight interface. Enterprise clients bring a much larger number of interconnected systems, and the integrations required to serve them are bigger, more complex, and higher-stakes. Most HR Tech teams need outside help sizing and architecting that jump correctly the first time.'
  }, {
    id: 'reconciliation',
    title: 'Data reconciliation & normalization',
    hook: 'HRIS and payroll systems that don\u2019t speak the same data language create risk at every pay cycle.',
    body: 'When employee and pay data move between HRIS and payroll systems without proper reconciliation and normalization, the result is silent errors: mismatched fields, duplicate records, payroll discrepancies that surface only after they\u2019ve already caused damage. Getting this right is a distinct architecture problem, separate from integration itself.'
  }, {
    id: 'performance',
    title: 'Performance at scale',
    hook: 'A system built for one population breaks under the weight of a global one.',
    body: 'Local deployments are rarely built with global data volume in mind. When a client rolls the same product out across every country they operate in, performance assumptions that worked for a few thousand records can fail under millions, and that failure often shows up in production, not in testing.'
  }]
}, {
  id: 'delivery',
  title: 'Delivery problems on both paths',
  strap: 'Whichever direction you are growing in, these two show up.',
  intro: '',
  tiles: [{
    id: 'implementation',
    title: 'Implementation friction',
    hook: 'The deal closes, the resources committed on paper don\u2019t show up in practice.',
    body: 'A recurring pattern: the client has the pain, agrees on the solution, and commits resources during the sales process. When implementation starts, the gap between what was promised and what\u2019s actually available shows up fast. In payroll implementations specifically, it\u2019s common for a client to discover mid-project that they don\u2019t have the internal staff or capacity to meet the agreed timeline, which pushes the go-live date and strains the relationship on both sides.'
  }, {
    id: 'misalignment',
    title: 'Product-engineering-business misalignment',
    hook: 'When product speaks business and engineering speaks technical, requirements get lost in translation.',
    body: 'Product often sits closer to the business language, while engineering operates in a more technical one. Without a shared frame of reference, requirements drift from what the business asked for to what actually gets built, and that gap tends to surface right before go-live, when it\u2019s most expensive to fix.'
  }]
}];
const TIERS_INTRO = 'Two paths, three ways to work together. Whether your growth is geographic or organizational, the fix follows the same three-tier approach, depending on how much of the problem you\u2019ve already mapped and how much support your team needs to execute it.';
const TIERS = [{
  code: 'tier 01',
  name: 'Product Assessment',
  strap: 'A second opinion on your product architecture, from someone who has built it before.',
  body: 'You get a full review of your current product and architecture and a written set of recommendations. No process review, no implementation plan, just a clear diagnosis of what\u2019s holding your platform back from enterprise scale.',
  bestFor: 'Best for teams who need an outside, expert read before deciding how much further to go.',
  timeline: 'About a week'
}, {
  code: 'tier 02',
  name: 'Scaling Readiness',
  strap: 'The diagnosis, the plan, and the metrics your team needs to execute it.',
  body: 'Beyond the product and architecture review, this tier looks at how your team delivers, both implementation and internal product development, and turns the findings into an action plan with clear success metrics your team can run with.',
  bestFor: 'This is where 25+ years scaling payroll, HCM, and EOR platforms applies most directly: the problems named on this page are exactly what this tier is built to diagnose and fix.',
  timeline: '10 days across 2\u20133 weeks'
}, {
  code: 'tier 03',
  name: 'Scaling Readiness + Oversight',
  strap: 'Everything in Scaling Readiness, plus a second set of expert eyes while your team builds.',
  body: 'Adds a diagnosis of your team\u2019s structure and weekly oversight while your team executes the plan. You get flagged risks and progress reports every week, without handing over operational control \u2014 your team stays in the driver\u2019s seat, we supervise and report.',
  bestFor: 'Scoped to the plan, plus weekly check-ins for the duration. Best for higher-complexity engagements, or when you want expert accountability built into the execution phase, not just the diagnosis.',
  timeline: 'Scoped to the plan'
}];
const TIERS_CLOSER = 'Pricing depends on scope and complexity. Book a call to talk through what fits.';
const ENGAGEMENT = [{
  title: 'Discovery call',
  body: 'We talk through the problem, your company\u2019s current situation, your objective, and a high-level read of where you are today versus where you want to get to.'
}, {
  title: 'Proposal',
  body: 'We shape an engagement model to fit the problem: a deep diagnostic of your platform, a diagnostic plus a blueprint your team can execute, or a deeper diagnostic across processes, platforms, and products with milestones we track together. We adjust the proposal with you before an estimate goes out.'
}, {
  title: 'Scope agreement',
  body: 'If you decide to move forward, we sign the estimate and a short contract covering responsibilities, scope, and estimated timeline. The NDA is signed either right after the discovery call or at this stage, before work begins.'
}, {
  title: 'Working sessions',
  body: 'We work directly with your team: diagnostics, detailed plans, and a close look at your processes and platforms. What we need from you \u2014 documentation, system access, or a sandbox environment \u2014 depends entirely on the scope.'
}, {
  title: 'Delivery',
  body: 'What you receive depends on what was scoped: a document, a presentation, a detailed plan, a working prototype, or functioning code. Delivery always happens in a live session, sometimes more than one.'
}];
const FIT = {
  yes: 'Funded, growth-stage HR Tech builders on one of the two paths.',
  no: 'Seed-stage companies.'
};
const CASES = [{
  id: 'case-1',
  slug: 'global-payroll-data',
  title: 'Unifying payroll data across 14 countries',
  oneLine: 'Sixteen systems, sixteen data formats, one normalized platform.',
  maps: 'Data reconciliation & normalization',
  problem: 'A global HR technology company needed to connect two HRIS platforms and fourteen country-specific payroll systems into a single source of truth for analysis. Each system used its own data format and field structure, with no shared standard across countries.',
  approach: 'Andrés led the architecture and build of a normalized data layer that reconciled all sixteen systems into one AI-driven analytics platform, resolving format inconsistencies at the integration layer instead of forcing every country system to conform to a single standard.',
  result: 'Two HRIS systems and fourteen payroll systems now feed one normalized platform, giving the organization a single, reliable view of data across every country it operates in. Reporting that once required manual reconciliation across sixteen systems now runs directly off the unified platform, cutting both the time and the cost of producing it.',
  figures: [{
    value: '16',
    unit: '',
    label: 'Systems unified'
  }, {
    value: '14',
    unit: '',
    label: 'Country payroll platforms'
  }, {
    value: '1',
    unit: '',
    label: 'Source of truth'
  }]
}, {
  id: 'case-2',
  slug: 'staffing-gap',
  title: 'Closing a staffing gap without slipping the go-live',
  oneLine: 'A four-month slip became a one-month slip, and revenue arrived three months earlier.',
  maps: 'Implementation friction',
  problem: 'A payroll implementation client agreed to the solution and committed internal resources during the sales process. Once implementation started, the client discovered it didn\u2019t have the staff or capacity to execute its side of the plan on schedule.',
  approach: 'Rather than waiting for the client to hire or reallocate people, Andrés designed and led a forward-deployed engineering model, using technology to absorb the work the client\u2019s team couldn\u2019t cover, instead of letting the timeline stall on a staffing problem.',
  result: 'The project shipped with a one-month delay instead of the extended slip a staffing gap like this typically causes.',
  figures: [{
    value: '1',
    unit: 'mo',
    label: 'Actual delay'
  }, {
    value: '4',
    unit: 'mo',
    label: 'Baseline delay avoided'
  }, {
    value: '3',
    unit: 'mo',
    label: 'Revenue earlier'
  }]
}, {
  id: 'case-3',
  slug: 'latam-expansion',
  title: 'Clearing the path for Latin American expansion, market by market',
  oneLine: 'One market ruled out before a line of code was written, the rest planned in detail.',
  maps: 'Global scalability',
  problem: 'A Latin American time management software company had built a solution for a country and wanted to expand into several others in the region. Before writing any code, the company needed to know which markets it could actually enter and what each one would legally require.',
  approach: 'Andrés reviewed the labor and compliance requirements for each target country, including local calculation rules and shift rules, and identified local compliance partners the company would need in each market. In parallel, he guided the company\u2019s architects through a technical review of whether their configuration tables and codebase could support country-specific behavior without a rebuild. The review surfaced a requirement in one target market strict enough that it changed the company\u2019s plan for that country.',
  result: 'The company decided to hold off on that market and moved forward with its other target countries, with a finalized plan for how the expansion would work in each one.',
  figures: [{
    value: '1',
    unit: '',
    label: 'Market ruled out before build'
  }, {
    value: '0',
    unit: '',
    label: 'Lines of code wasted'
  }]
}];
const ABOUT = {
  headline: '25+ years building and scaling payroll, HCM, and EOR platforms across dozens of countries.',
  bio: 'As VP of Application Development at ADP GlobalView, he scaled the platform to 43 countries. As VP of Product Development at Atlas, he built the EOR platform to 100+ countries, supporting a $200M Series B. Most recently, as SVP of Engineering and Data Strategy, he led an AI-driven engineering transformation that cut engineering costs by 40% while building an agent-based Pay Intelligence platform.',
  facts: [['In HR Tech', '25+ years'], ['Built platforms at', 'ADP GlobalView · Atlas'], ['Domains', 'Payroll · HCM · EOR'], ['Reach', 'Dozens of countries']]
};
const FAQ = [{
  q: 'How long does an engagement typically take?',
  a: 'It depends on the tier. A Product Assessment takes about a week. Scaling Readiness runs 10 days across 2\u20133 weeks, depending on your team\u2019s availability. Scaling Readiness + Oversight is scoped to the plan, plus weekly check-ins for the duration of execution.'
}, {
  q: 'What happens if our team can\u2019t execute the recommendation?',
  a: 'The diagnosis and plan are built for your team to execute, not for us to execute for you. If capacity turns out to be the real constraint, the Oversight tier adds weekly reporting and flagged risks while your team builds, without taking over the work. Where it helps, Andrés can also connect clients to his network of HR Tech and AI talent to close a specific gap.'
}, {
  q: 'Do you work with teams outside HR Tech?',
  a: 'The core focus is HR Tech, but the expertise transfers to adjacent problems: data reconciliation, system integration, and architecture built to hold enterprise scale. Payments is one example of a space with the same underlying challenge. If your product has that kind of architecture problem, even outside HR Tech, it\u2019s worth a conversation.'
}, {
  q: 'How does pricing work?',
  a: 'Engagement pricing depends on scope, not a fixed rate card. A focused diagnostic on one system costs less than a full architecture review across multiple markets. We provide a specific range once we understand what you\u2019re trying to solve, during the initial call.'
}, {
  q: 'Do you sign an NDA?',
  a: 'Yes. A standard NDA and confidentiality agreement are in place before any system access, code review, or team interview begins.'
}, {
  q: 'What do you need from our team?',
  a: 'Access to the relevant systems, time from your architects or engineers for structured interviews, and, where the engagement involves market expansion, visibility into your actual expansion plans and timeline. We scope the specific access needed during the initial call, so your team isn\u2019t opening doors they don\u2019t need to.'
}, {
  q: 'Do you work with our competitors?',
  a: 'We don\u2019t take on simultaneous engagements with direct competitors. If a conflict comes up, we\u2019ll tell you before it becomes a problem.'
}];
const CONTACT = {
  headline: 'Let\u2019s talk about what\u2019s holding your architecture back.',
  sub: 'Pick a time that works. No form, no qualification call before the call.',
  booking: 'https://tidycal.com/m8n0n8r/30-minute-meeting',
  email: 'info@safdieconsulting.com',
  linkedinCompany: 'https://www.linkedin.com/company/safdie-consulting',
  linkedinPersonal: 'https://www.linkedin.com/in/andressafdie',
  privacyNote: 'Booking is handled by Tidycal, which collects your name and email under its own privacy policy. See our privacy policy for how we handle your data.'
};
const FOOTER = {
  strap: 'HR Tech advisory for global product and data architecture.',
  note: '© 2026 Safdie Consulting. All rights reserved.'
};
Object.assign(__ds_scope, { NAV, HERO, NUMBERS, PATHS, TIERS_INTRO, TIERS, TIERS_CLOSER, ENGAGEMENT, FIT, CASES, ABOUT, FAQ, CONTACT, FOOTER });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/content.js", error: String((e && e.message) || e) }); }

// ui_kits/website/CaseStudy.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BLOCKS = [['The problem', 'problem'], ['The approach', 'approach'], ['The result', 'result']];

/** One case study at its own URL, so it can be pasted into an outreach message. */
function CaseStudy({
  id,
  onNavigate
}) {
  const c = __ds_scope.CASES.find(x => x.id === id) || __ds_scope.CASES[0];
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-inverse)',
      padding: '72px var(--page-margin)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    tone: "inverse"
  }, "Case study \xB7 maps to ", c.maps), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '26px 0 0',
      fontSize: 'var(--size-h1)',
      lineHeight: 'var(--lh-h1)',
      letterSpacing: 'var(--track-h1)',
      fontWeight: 'var(--weight-semibold)',
      maxWidth: 900,
      textWrap: 'balance'
    }
  }, c.title), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 22,
      fontSize: 'var(--size-lead)',
      lineHeight: 'var(--lh-lead)',
      color: 'var(--text-on-inverse-2)',
      maxWidth: 'var(--measure-lead)'
    }
  }, c.oneLine), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      flexWrap: 'wrap',
      marginTop: 'var(--space-4)',
      paddingTop: 'var(--space-3)',
      borderTop: '1px solid var(--rule-inverse)'
    }
  }, c.figures.map(fg => /*#__PURE__*/React.createElement(__ds_scope.Stat, _extends({
    key: fg.label,
    tone: "inverse"
  }, fg))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--space-6) var(--page-margin)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--rule)'
    }
  }, BLOCKS.map(([label, key], i) => /*#__PURE__*/React.createElement("div", {
    key: key,
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 260px) minmax(0, 1fr)',
      gap: 'var(--space-4)',
      padding: '30px 0',
      borderBottom: '1px solid var(--rule-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--text-accent)'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--size-h3)',
      lineHeight: 1.2,
      letterSpacing: 'var(--track-h3)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, label)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--size-body)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-secondary)'
    }
  }, c[key])))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      flexWrap: 'wrap',
      marginTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 300,
      fontSize: 'var(--size-lead)',
      lineHeight: 1.4,
      fontWeight: 'var(--weight-medium)'
    }
  }, "Recognise the pattern? Let's talk about yours."), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    onClick: () => onNavigate?.('contact')
  }, "Book a call"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    onClick: () => onNavigate?.('cases')
  }, "All case studies")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-6)',
      paddingTop: 'var(--space-3)',
      borderTop: '1px solid var(--rule)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    tone: "muted"
  }, "Other cases"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 0,
      marginTop: 12
    }
  }, __ds_scope.CASES.filter(x => x.id !== c.id).map(x => /*#__PURE__*/React.createElement("a", {
    key: x.id,
    href: `/case-studies/${x.slug}`,
    onClick: e => {
      e.preventDefault();
      onNavigate?.(`case:${x.id}`);
    },
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--space-3)',
      padding: '16px 0',
      borderBottom: '1px solid var(--rule-soft)',
      fontSize: 'var(--size-body)',
      color: 'inherit',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", null, x.title), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-accent)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, "Read \u2192")))))));
}
Object.assign(__ds_scope, { CaseStudy });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CaseStudy.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Privacy.jsx
try { (() => {
const SECTIONS = [['What we collect', [['Contact information.', 'If you email us, connect on LinkedIn, or book a call, we collect your name, email address, and anything else you choose to share.'], ['Booking data.', 'Scheduling a call through our booking widget (Tidycal) shares your name, email, and the details you provide with Tidycal, which processes that data under its own privacy policy.'], ['Analytics data.', 'We use Google Analytics to understand how visitors use this site, including pages viewed and general location. This runs only after you accept cookies through the banner on your first visit.']]], ['Why we collect it', [['', 'To respond to inquiries and schedule calls (legal basis: your consent, and steps necessary to enter a business relationship at your request).'], ['', 'To understand and improve the site (legal basis: your consent, given through the cookie banner).'], ['', 'We do not sell your data, and we do not use it for advertising.']]], ['Who we share it with', [['', 'Tidycal, for scheduling.'], ['', 'Google Analytics, for site analytics.'], ['', 'We do not share your data with any other third party except where required by law.']]], ['How long we keep it', [['', 'We retain contact and booking data for the duration of our relationship with you and for a limited period afterward, then delete it unless we’re required to keep it longer by law.']]], ['Your rights', [['', 'If you are in the EU or UK, you have the right to access, correct, delete, or export your personal data, and to withdraw consent at any time. To exercise any of these rights, contact us at info@safdieconsulting.com. If you are not satisfied with our response, you have the right to lodge a complaint with your local data protection authority.']]], ['Cookies', [['', 'We use a cookie consent banner on your first visit. Analytics cookies load only if you accept. You can change your preference at any time using the "Cookie settings" link in the footer.']]], ['Changes to this policy', [['', 'If we make material changes, we’ll update the date at the top of this page.']]]];
function Privacy() {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      padding: 'var(--space-6) var(--page-margin)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, "Legal"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '22px 0 0',
      fontSize: 'var(--size-h1)',
      lineHeight: 'var(--lh-h1)',
      letterSpacing: 'var(--track-h1)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, "Privacy Policy"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      color: 'var(--text-muted)'
    }
  }, "Last updated 2026-09-18"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 26,
      fontSize: 'var(--size-body)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-secondary)'
    }
  }, "Safdie Consulting (\"we,\" \"us,\" \"our\") operates safdieconsulting.com. This policy explains what personal data we collect, why, and how you can control it."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)',
      borderTop: '1px solid var(--rule)',
      maxWidth: 900
    }
  }, SECTIONS.map(([title, rows]) => /*#__PURE__*/React.createElement("div", {
    key: title,
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 240px) minmax(0, 1fr)',
      gap: 'var(--space-4)',
      padding: '26px 0',
      borderBottom: '1px solid var(--rule-soft)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--size-h3)',
      lineHeight: 1.2,
      letterSpacing: 'var(--track-h3)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12
    }
  }, rows.map(([lead, text], i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontSize: 'var(--size-small)',
      lineHeight: 1.6,
      color: 'var(--text-secondary)'
    }
  }, lead ? /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-body)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, lead, " ") : null, text)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-4)',
      fontSize: 'var(--size-small)',
      lineHeight: 1.7,
      color: 'var(--text-secondary)'
    }
  }, "Safdie Consulting", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${__ds_scope.CONTACT.email}`
  }, __ds_scope.CONTACT.email)));
}
Object.assign(__ds_scope, { Privacy });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Privacy.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections/About.jsx
try { (() => {
function About() {
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    style: {
      padding: 'var(--space-6) var(--page-margin) 0'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeader, {
    number: "05",
    title: "About"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) 320px',
      gap: 'var(--space-5)',
      marginTop: 'var(--space-4)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 34,
      lineHeight: 1.15,
      letterSpacing: '-0.03em',
      fontWeight: 'var(--weight-semibold)',
      maxWidth: 760,
      textWrap: 'balance'
    }
  }, __ds_scope.ABOUT.headline), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 22,
      fontSize: 'var(--size-body)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-secondary)'
    }
  }, __ds_scope.ABOUT.bio), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '0 var(--space-4)',
      marginTop: 'var(--space-4)',
      borderTop: '1px solid var(--rule)'
    }
  }, __ds_scope.ABOUT.facts.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 20,
      padding: '13px 0',
      borderBottom: '1px solid var(--rule-soft)',
      fontSize: 'var(--size-small)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, k), /*#__PURE__*/React.createElement("span", null, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "quiet",
    as: "a",
    href: __ds_scope.CONTACT.linkedinPersonal
  }, "Andr\xE9s on LinkedIn \u2192"))), /*#__PURE__*/React.createElement(__ds_scope.Placeholder, {
    ratio: "4 / 5",
    label: "professional photo \xB7 4:5 \xB7 desaturated 75%"
  })));
}
Object.assign(__ds_scope, { About });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections/Cases.jsx
try { (() => {
/** One-line case cards; each links to its own URL so it can be pasted into outreach. */
function Cases({
  onOpenCase
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "cases",
    style: {
      padding: 'var(--space-6) var(--page-margin) 0'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeader, {
    number: "04",
    title: "Case Studies",
    note: "Anonymized. Each has its own page you can share."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--rule)',
      marginTop: 'var(--space-4)'
    }
  }, __ds_scope.CASES.map((c, i) => /*#__PURE__*/React.createElement("a", {
    key: c.id,
    href: `/case-studies/${c.slug}`,
    onClick: e => {
      if (onOpenCase) {
        e.preventDefault();
        onOpenCase(c.id);
      }
    },
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) auto',
      gap: 'var(--space-4)',
      alignItems: 'center',
      padding: '28px 0',
      borderBottom: '1px solid var(--rule-soft)',
      color: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--text-accent)',
      flex: 'none'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--size-h3)',
      lineHeight: 1.2,
      letterSpacing: 'var(--track-h3)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, c.title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 8,
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--lh-small)',
      color: 'var(--text-secondary)'
    }
  }, c.oneLine), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    tone: "muted",
    as: "span"
  }, c.maps)))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--size-small)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-accent)'
    }
  }, "Read the case \u2192")))));
}
Object.assign(__ds_scope, { Cases });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections/Cases.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections/Contact.jsx
try { (() => {
function Contact({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      padding: 'var(--space-6) var(--page-margin)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeader, {
    number: "07",
    title: "Contact"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)',
      gap: 'var(--space-5)',
      marginTop: 'var(--space-4)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 40,
      lineHeight: 1.1,
      letterSpacing: '-0.035em',
      fontWeight: 'var(--weight-semibold)',
      textWrap: 'balance'
    }
  }, __ds_scope.CONTACT.headline), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 18,
      fontSize: 'var(--size-lead)',
      lineHeight: 'var(--lh-lead)',
      color: 'var(--text-secondary)'
    }
  }, __ds_scope.CONTACT.sub), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-4)',
      borderTop: '1px solid var(--rule)'
    }
  }, [['Email', __ds_scope.CONTACT.email, `mailto:${__ds_scope.CONTACT.email}`], ['LinkedIn — company', 'linkedin.com/company/safdie-consulting', __ds_scope.CONTACT.linkedinCompany], ['LinkedIn — Andrés', 'linkedin.com/in/andressafdie', __ds_scope.CONTACT.linkedinPersonal]].map(([k, v, href]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 20,
      padding: '14px 0',
      borderBottom: '1px solid var(--rule-soft)',
      fontSize: 'var(--size-small)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, k), /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '13px'
    }
  }, v))))), /*#__PURE__*/React.createElement(__ds_scope.BookingEmbed, {
    placeholder: true,
    height: 420,
    url: __ds_scope.CONTACT.booking,
    privacyNote: __ds_scope.CONTACT.privacyNote.replace(' See our privacy policy for how we handle your data.', ''),
    privacyHref: "#privacy"
  })));
}
Object.assign(__ds_scope, { Contact });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections/Engagement.jsx
try { (() => {
function Engagement() {
  return /*#__PURE__*/React.createElement("section", {
    id: "engagement",
    style: {
      padding: 'var(--space-6) var(--page-margin) 0'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeader, {
    number: "03",
    title: "How an engagement runs",
    note: "Five steps, start to delivery."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--rule)',
      marginTop: 'var(--space-4)'
    }
  }, __ds_scope.ENGAGEMENT.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.title,
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 320px) minmax(0, 1fr)',
      gap: 'var(--space-4)',
      padding: '26px 0',
      borderBottom: '1px solid var(--rule-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--text-accent)'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--size-h3)',
      lineHeight: 1.2,
      letterSpacing: 'var(--track-h3)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, s.title)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--size-body)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-secondary)'
    }
  }, s.body)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: 'var(--border-accent) solid var(--surface-accent)',
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, "Who this is for"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 'var(--size-body)',
      lineHeight: 1.5
    }
  }, __ds_scope.FIT.yes)), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: 'var(--border-accent) solid var(--sc-ink-22)',
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    tone: "muted"
  }, "Who it is not for"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 'var(--size-body)',
      lineHeight: 1.5,
      color: 'var(--text-secondary)'
    }
  }, __ds_scope.FIT.no))));
}
Object.assign(__ds_scope, { Engagement });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections/Engagement.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections/Faq.jsx
try { (() => {
function Faq() {
  const items = __ds_scope.FAQ.map((item, i) => ({
    id: `faq-${i}`,
    title: item.q,
    body: item.a
  }));
  return /*#__PURE__*/React.createElement("section", {
    id: "faq",
    style: {
      padding: 'var(--space-6) var(--page-margin) 0'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeader, {
    number: "06",
    title: "FAQ",
    note: "The objections that actually come up."
  }), /*#__PURE__*/React.createElement(__ds_scope.Accordion, {
    style: {
      marginTop: 'var(--space-4)'
    },
    items: items
  }));
}
Object.assign(__ds_scope, { Faq });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections/Faq.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections/Hero.jsx
try { (() => {
function Hero({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      padding: '84px var(--page-margin) 72px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 1,
      background: 'var(--surface-accent)'
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, "HR Tech advisory")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 'var(--size-display)',
      lineHeight: 'var(--lh-display)',
      letterSpacing: 'var(--track-display)',
      fontWeight: 'var(--weight-semibold)',
      maxWidth: 1000,
      textWrap: 'balance'
    }
  }, __ds_scope.HERO.headline), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 30,
      fontSize: 'var(--size-lead)',
      lineHeight: 'var(--lh-lead)',
      color: 'var(--text-secondary)',
      maxWidth: 'var(--measure-lead)'
    }
  }, __ds_scope.HERO.sub), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      flexWrap: 'wrap',
      marginTop: 34,
      paddingTop: 26,
      borderTop: '1px solid var(--rule)'
    }
  }, __ds_scope.HERO.bullets.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: b,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-accent)'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--size-small)',
      color: 'var(--text-secondary)'
    }
  }, b)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 34,
      fontSize: 24,
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
      fontWeight: 'var(--weight-medium)',
      maxWidth: 620
    }
  }, __ds_scope.HERO.closer), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 36,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    onClick: () => onNavigate?.('contact')
  }, "Book a call"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    onClick: () => onNavigate?.('how')
  }, "See how we work")));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections/HowWeWork.jsx
try { (() => {
function HowWeWork({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "how",
    style: {
      padding: 'var(--space-6) var(--page-margin) 0'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeader, {
    number: "02",
    title: "How We Work",
    note: "The same three tiers serve both paths."
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 'var(--space-4)',
      fontSize: 'var(--size-lead)',
      lineHeight: 'var(--lh-lead)',
      color: 'var(--text-secondary)',
      maxWidth: 'var(--measure-lead)'
    }
  }, __ds_scope.TIERS_INTRO), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-5)'
    }
  }, __ds_scope.TIERS.map((t, i) => {
    const inverse = i === __ds_scope.TIERS.length - 1;
    return /*#__PURE__*/React.createElement(__ds_scope.Card, {
      key: t.code,
      accent: true,
      tone: inverse ? 'inverse' : 'light',
      padding: 34,
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
      tone: inverse ? 'inverse' : 'accent',
      style: {
        textTransform: 'none',
        letterSpacing: 0
      }
    }, t.code), /*#__PURE__*/React.createElement(__ds_scope.Tag, {
      tone: inverse ? 'ink' : 'fill'
    }, t.timeline)), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: '18px 0 0',
        fontSize: 'var(--size-h3)',
        lineHeight: 1.15,
        letterSpacing: 'var(--track-h3)',
        fontWeight: 'var(--weight-semibold)'
      }
    }, t.name), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        fontSize: 'var(--size-small)',
        lineHeight: 1.45,
        fontWeight: 'var(--weight-medium)',
        color: inverse ? 'var(--text-accent-inverse)' : 'var(--text-accent)'
      }
    }, t.strap), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 16,
        fontSize: 'var(--size-small)',
        lineHeight: 'var(--lh-small)',
        color: inverse ? 'var(--text-on-inverse-2)' : 'var(--text-secondary)'
      }
    }, t.body), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'auto',
        paddingTop: 20,
        borderTop: `1px solid ${inverse ? 'var(--rule-inverse)' : 'var(--rule-soft)'}`,
        fontSize: '14.5px',
        lineHeight: 1.5,
        color: inverse ? 'var(--sc-paper-82)' : 'var(--text-secondary)'
      }
    }, t.bestFor));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      flexWrap: 'wrap',
      marginTop: 'var(--space-4)',
      paddingTop: 'var(--space-3)',
      borderTop: '1px solid var(--rule)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--size-body)',
      color: 'var(--text-secondary)',
      flex: 1,
      minWidth: 280
    }
  }, __ds_scope.TIERS_CLOSER), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    onClick: () => onNavigate?.('contact')
  }, "Book a call")));
}
Object.assign(__ds_scope, { HowWeWork });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections/HowWeWork.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections/Numbers.jsx
try { (() => {
/**
 * Proof arrives before the problem tiles.
 *
 * The rules are drawn on the cells, not by painting the container and letting
 * it show through the gaps — with a width-derived column count an empty track
 * would paint as a surface. Column counts are also constrained to divisors of
 * the item count so there are never empty tracks in the first place.
 */
function Numbers() {
  const ref = React.useRef(null);
  const [cols, setCols] = React.useState(__ds_scope.NUMBERS.length);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width;
      // Only divisors of 4, so the grid is always exactly filled.
      setCols(w < 460 ? 1 : w < 1000 ? 2 : 4);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-inverse)',
      padding: 'var(--space-5) var(--page-margin)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`
    }
  }, __ds_scope.NUMBERS.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: n.label,
    style: {
      padding: '22px 24px',
      borderLeft: i % cols === 0 ? 'none' : '1px solid var(--rule-inverse)',
      borderTop: i < cols ? 'none' : '1px solid var(--rule-inverse)',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 62,
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: '-0.05em',
      lineHeight: 0.9
    }
  }, n.value, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 32,
      color: 'var(--sc-haze)'
    }
  }, n.unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--size-small)',
      lineHeight: 1.45,
      marginTop: 14,
      color: 'var(--text-on-inverse-2)'
    }
  }, n.label)))));
}
Object.assign(__ds_scope, { Numbers });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections/Numbers.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections/Problems.jsx
try { (() => {
function Problems() {
  return /*#__PURE__*/React.createElement("section", {
    id: "problems",
    style: {
      padding: 'var(--space-6) var(--page-margin) 0'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeader, {
    number: "01",
    title: "Problems We Solve",
    note: "Grouped by the two paths. Open a tile for the fuller explanation."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-6)',
      marginTop: 'var(--space-5)'
    }
  }, __ds_scope.PATHS.map(path => /*#__PURE__*/React.createElement("div", {
    key: path.id
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 'var(--space-4)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, path.title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontSize: 'var(--size-h3)',
      lineHeight: 1.25,
      letterSpacing: 'var(--track-h3)',
      fontWeight: 'var(--weight-medium)'
    }
  }, path.strap)), path.intro ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--size-body)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-secondary)'
    }
  }, path.intro) : /*#__PURE__*/React.createElement("div", null)), /*#__PURE__*/React.createElement(__ds_scope.Accordion, {
    style: {
      marginTop: 'var(--space-3)'
    },
    items: path.tiles
  })))));
}
Object.assign(__ds_scope, { Problems });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections/Problems.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
/** The home page, in the locked section order. */
function Home({
  onNavigate,
  onOpenCase
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(__ds_scope.Hero, {
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(__ds_scope.Numbers, null), /*#__PURE__*/React.createElement(__ds_scope.Problems, null), /*#__PURE__*/React.createElement(__ds_scope.HowWeWork, {
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(__ds_scope.Engagement, null), /*#__PURE__*/React.createElement(__ds_scope.Cases, {
    onOpenCase: onOpenCase
  }), /*#__PURE__*/React.createElement(__ds_scope.About, null), /*#__PURE__*/React.createElement(__ds_scope.Faq, null), /*#__PURE__*/React.createElement(__ds_scope.Contact, {
    onNavigate: onNavigate
  }));
}
Object.assign(__ds_scope, { Home });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Site.jsx
try { (() => {
const SECTION_IDS = __ds_scope.NAV.map(n => n.id);

/** Click-through recreation of safdieconsulting.com. */
function Site({
  initial = 'home'
}) {
  const [route, setRoute] = React.useState(initial);
  const [cookiesOpen, setCookiesOpen] = React.useState(false);
  const [active, setActive] = React.useState('');
  const scrollRef = React.useRef(null);

  // Scroll-spy for the nav underline.
  React.useEffect(() => {
    if (route !== 'home') {
      setActive('');
      return;
    }
    const root = scrollRef.current;
    const els = SECTION_IDS.map(id => document.getElementById(id)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActive(visible.target.id);
    }, {
      root,
      rootMargin: '-96px 0px -60% 0px',
      threshold: 0
    });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [route]);
  const go = id => {
    if (id === 'privacy') {
      setRoute('privacy');
      scrollRef.current?.scrollTo(0, 0);
      return;
    }
    if (id === 'cookies') {
      setCookiesOpen(true);
      return;
    }
    if (String(id).startsWith('case:')) {
      setRoute(String(id).slice(5));
      scrollRef.current?.scrollTo(0, 0);
      return;
    }
    if (route !== 'home') {
      setRoute('home');
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        const root = scrollRef.current;
        if (el && root) root.scrollTo({
          top: el.offsetTop - 80
        });else root?.scrollTo(0, 0);
      });
      return;
    }
    const el = document.getElementById(id);
    const root = scrollRef.current;
    if (el && root) root.scrollTo({
      top: Math.max(0, el.offsetTop - 80),
      behavior: 'smooth'
    });else root?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const isCase = __ds_scope.CASES.some(c => c.id === route);
  return /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      background: 'var(--surface-page)',
      height: '100vh',
      overflowY: 'auto',
      position: 'relative',
      // The website opts into soft corners. Deck, proposal and signature stay square.
      '--radius-control': 'var(--radius-full)',
      '--radius-surface': '20px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.NavBar, {
    links: __ds_scope.NAV,
    active: active,
    onNavigate: go,
    cta: {
      label: 'Book a call',
      onClick: () => go('contact')
    }
  }), route === 'home' ? /*#__PURE__*/React.createElement(__ds_scope.Home, {
    onNavigate: go,
    onOpenCase: id => go(`case:${id}`)
  }) : null, isCase ? /*#__PURE__*/React.createElement(__ds_scope.CaseStudy, {
    id: route,
    onNavigate: go
  }) : null, route === 'privacy' ? /*#__PURE__*/React.createElement(__ds_scope.Privacy, null) : null, /*#__PURE__*/React.createElement(__ds_scope.Footer, {
    strapline: __ds_scope.FOOTER.strap,
    contact: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
      href: `mailto:${__ds_scope.CONTACT.email}`,
      style: {
        color: 'inherit'
      }
    }, __ds_scope.CONTACT.email), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
      href: __ds_scope.CONTACT.linkedinCompany,
      style: {
        color: 'inherit'
      }
    }, "linkedin.com/company/safdie-consulting")),
    columns: [{
      title: 'Site',
      links: __ds_scope.NAV.map(n => ({
        label: n.label,
        onClick: () => go(n.id)
      }))
    }, {
      title: 'Legal',
      links: [{
        label: 'Privacy Policy',
        onClick: () => go('privacy')
      }, {
        label: 'Cookie settings',
        onClick: () => go('cookies')
      }]
    }],
    note: __ds_scope.FOOTER.note
  }), /*#__PURE__*/React.createElement(__ds_scope.CookieBanner, {
    forceOpen: cookiesOpen,
    onChange: () => setCookiesOpen(false),
    privacyHref: "#privacy"
  }));
}
Object.assign(__ds_scope, { Site });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Site.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Placeholder = __ds_scope.Placeholder;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.BookingEmbed = __ds_scope.BookingEmbed;

__ds_ns.CookieBanner = __ds_scope.CookieBanner;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.CaseStudy = __ds_scope.CaseStudy;

__ds_ns.Home = __ds_scope.Home;

__ds_ns.Privacy = __ds_scope.Privacy;

__ds_ns.Site = __ds_scope.Site;

__ds_ns.NAV = __ds_scope.NAV;

__ds_ns.HERO = __ds_scope.HERO;

__ds_ns.NUMBERS = __ds_scope.NUMBERS;

__ds_ns.PATHS = __ds_scope.PATHS;

__ds_ns.TIERS_INTRO = __ds_scope.TIERS_INTRO;

__ds_ns.TIERS = __ds_scope.TIERS;

__ds_ns.TIERS_CLOSER = __ds_scope.TIERS_CLOSER;

__ds_ns.ENGAGEMENT = __ds_scope.ENGAGEMENT;

__ds_ns.FIT = __ds_scope.FIT;

__ds_ns.CASES = __ds_scope.CASES;

__ds_ns.ABOUT = __ds_scope.ABOUT;

__ds_ns.FAQ = __ds_scope.FAQ;

__ds_ns.CONTACT = __ds_scope.CONTACT;

__ds_ns.FOOTER = __ds_scope.FOOTER;

__ds_ns.About = __ds_scope.About;

__ds_ns.Cases = __ds_scope.Cases;

__ds_ns.Contact = __ds_scope.Contact;

__ds_ns.Engagement = __ds_scope.Engagement;

__ds_ns.Faq = __ds_scope.Faq;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.HowWeWork = __ds_scope.HowWeWork;

__ds_ns.Numbers = __ds_scope.Numbers;

__ds_ns.Problems = __ds_scope.Problems;

})();
