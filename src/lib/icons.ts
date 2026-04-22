/**
 * Centralized SVG icons as raw HTML strings.
 * Usage: {@html icons.shield} inside a wrapper element that controls sizing/color.
 *
 * Icons are rendered without sizing/color classes so each usage site can
 * apply its own Tailwind utilities via a wrapper element.
 */

export const icons = {
  // ── Navigation ──────────────────────────────────────────────────────
  backArrow: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>`,

  // ── Theme toggle ───────────────────────────────────────────────────
  sun: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,

  moon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`,

  // ── Trust / security ───────────────────────────────────────────────
  shield: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,

  shieldCheck: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,

  ribbon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75"><path d="M6.05 5.533a2.92 2.92 0 0 1 3.489-3.482a2.92 2.92 0 0 1 4.92 0a2.92 2.92 0 0 1 3.489 3.489a2.92 2.92 0 0 1 0 4.92a2.92 2.92 0 0 1-3.482 3.489a2.92 2.92 0 0 1-4.928 0a2.92 2.92 0 0 1-3.489-3.482a2.92 2.92 0 0 1 0-4.935"/><path d="m10 7.76l1.46 1.46l2.92-2.92"/><path d="m15.477 14.2 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/></svg>`,

  gdprBadge: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.25"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77a4 4 0 0 1 6.74 0a4 4 0 0 1 4.78 4.78a4 4 0 0 1 0 6.74a4 4 0 0 1-4.77 4.78a4 4 0 0 1-6.75 0a4 4 0 0 1-4.78-4.77a4 4 0 0 1 0-6.76"/><path d="m9 12l2 2l4-4"/><path d=""/></g></svg>`,

  neverReadYourMails: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 18l-.722-3.25M2 8a10.645 10.645 0 0 0 20 0m-2 7l-1.726-2.05M4 15l1.726-2.05M9 18l.722-3.25"/></svg>`,

  verifyRibbonNoTail: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77a4 4 0 0 1 6.74 0a4 4 0 0 1 4.78 4.78a4 4 0 0 1 0 6.74a4 4 0 0 1-4.77 4.78a4 4 0 0 1-6.75 0a4 4 0 0 1-4.78-4.77a4 4 0 0 1 0-6.76"/><path d="m9 12l2 2l4-4"/></g></svg>`,

  privacyByDesignGitCompare: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="5" cy="6" r="3"/><path d="M5 9v12M15 9l-3-3l3-3"/><path d="M12 6h5a2 2 0 0 1 2 2v3m0 4v6m3-3h-6"/></g></svg>`,

  committedToCompliance: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5h8m-8 7h8m-8 7h8M3 17l2 2l4-4M3 7l2 2l4-4"/></svg>`,

  authenticate: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M20 11v6m0-4h2M3 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 2.072.578"/><circle cx="10" cy="7" r="4"/><circle cx="20" cy="19" r="2"/></g></svg>`,

  share: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 2v13m4-9l-4-4l-4 4m-4 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/></svg>`,

  easyToUse: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 14c.2-1 .7-1.7 1.5-2.5c1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5c.7.7 1.3 1.5 1.5 2.5m0 4h6m-5 4h4"/></svg>`,

  openBook: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 7v14m4-9h2m-2-4h2M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4a4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3a3 3 0 0 0-3-3zm3-6h2M6 8h2"/></svg>`,

  privateDataProtect: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><rect width="8" height="5" x="14" y="17" rx="1"/><path d="M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5"/><path d="M20 17v-2a2 2 0 1 0-4 0v2"/></g></svg>`,

  mailUnsubscribe: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="100%" height="100%">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h9"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 17l5 5m0-5l-5 5"/>
    </svg>`,

  casaVerifiedBadge: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1"><path d="M7 17.998c-2.175-.012-3.353-.108-4.121-.877C2 16.243 2 14.828 2 12V8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2h8c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v4c0 2.828 0 4.243-.879 5.121c-.73.73-1.829.854-3.801.875l-.82.002"/><path stroke-linecap="round" d="M9 6h6M7 9.5h10"/><path d="M10.89 13.945a1.71 1.71 0 0 1 2.22 0c.273.234.614.375.972.404a1.71 1.71 0 0 1 1.57 1.568c.028.36.169.7.402.974a1.71 1.71 0 0 1 0 2.218a1.7 1.7 0 0 0-.403.974a1.71 1.71 0 0 1-1.569 1.569a1.7 1.7 0 0 0-.973.403a1.71 1.71 0 0 1-2.219 0a1.7 1.7 0 0 0-.973-.404a1.71 1.71 0 0 1-1.569-1.568a1.7 1.7 0 0 0-.403-.974a1.71 1.71 0 0 1 0-2.218a1.7 1.7 0 0 0 .403-.974a1.71 1.71 0 0 1 1.57-1.568c.358-.029.699-.17.973-.404Z"/><path stroke-linecap="round" stroke-linejoin="round" d="m10.5 18.2l.857.8l2.143-2"/></g></svg>`,

  ccpaBadge: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" stroke="currentColor" stroke-width="0.25" d="M16.923 13.57l2.551 2.274c0.053 0.047 0.087 0.111 0.097 0.181c0.001 0.006 0.121 0.751 0.685 1.119c0.056 0.037 0.098 0.091 0.12 0.154c0.027 0.08 0.127 0.49-0.467 0.986c-0.013 0.11 0.005 0.221 0.052 0.322c0.074 0.134 0.089 0.294 0.041 0.439c-0.056 0.149-0.157 0.277-0.288 0.367c-0.006 0.07 0.026 0.139 0.085 0.178c0.151 0.068 0.268 0.196 0.323 0.352c0.063 0.23 0.04 0.475-0.066 0.688c-0.043 0.089-0.128 0.152-0.226 0.166l-4.412 0.651c-0.143 0.021-0.282-0.064-0.328-0.2c-0.176-0.52-0.774-1.881-1.466-2.127c-0.249 0.059-0.512 0.008-0.721-0.141c-0.149-0.13-0.232-0.321-0.225-0.519c-0.091-0.014-0.184-0.011-0.274 0.008c-0.035 0.006-0.07 0.005-0.104-0.001c-0.109-0.021-0.657-0.141-0.863-0.485c-0.089-0.08-0.491-0.21-0.872-0.283c-0.245 0.022-1.024 0.055-1.32-0.364c-0.101-0.142-0.185-0.386-0.019-0.743c0.003-0.05-0.008-0.384-0.709-1.132c-0.013-0.014-0.025-0.029-0.035-0.045l-0.617-0.976c-0.21-0.101-0.653-0.358-0.75-0.746c-0.051-0.21 0.004-0.432 0.148-0.593c0.061-0.06 0.095-0.142 0.095-0.228c-0.015-0.067-0.053-0.128-0.106-0.171c-0.444-0.266-0.716-0.747-0.715-1.264c0.004-0.124 0.062-0.239 0.159-0.316c0.14-0.101 0.311-0.15 0.483-0.139c-0.11-0.115-0.199-0.25-0.261-0.396c-0.069 0.097-0.169 0.166-0.283 0.196c-0.218 0.036-0.441-0.035-0.598-0.191c-0.052-0.049-0.085-0.116-0.092-0.187c-0.1-0.528-0.376-1.007-0.783-1.359c-0.537-0.454-0.758-1.184-0.562-1.86c-0.006-0.228-0.078-0.768-0.355-0.938c-0.692-0.423-0.153-1.627-0.007-1.921c0.04-0.133 0.283-0.997-0.072-1.522c-0.075-0.111-0.067-0.258 0.019-0.361c0.044-0.117 0.156-0.195 0.281-0.195l6.215 0c0.165 0 0.3 0.135 0.3 0.3l0 5.723l0.685 0.61c0.048 0.053 0.076 0.123 0.076 0.201c-0.001 0.166-0.137 0.301-0.302 0.303c-0.061 0-0.118-0.018-0.165-0.049l-0.793-0.707c-0.064-0.057-0.1-0.138-0.1-0.224l0-5.558l-5.532-0c0.256 0.763-0.033 1.643-0.048 1.686c-0.005 0.013-0.01 0.027-0.017 0.039c-0.252 0.501-0.364 1.076-0.226 1.161c0.639 0.391 0.644 1.387 0.642 1.499c-0 0.035-0.007 0.069-0.019 0.101c-0.138 0.457 0.011 0.955 0.378 1.26c0.451 0.395 0.775 0.914 0.931 1.492c0.057-0.173 0.199-0.304 0.376-0.349c0.186-0.029 0.374 0.041 0.496 0.184c0.055 0.061 0.082 0.142 0.075 0.224c0.006 0.19 0.095 0.367 0.244 0.485c0.009 0.007 0.018 0.015 0.027 0.023c0.209 0.197 0.293 0.397 0.25 0.593c-0.043 0.169-0.169 0.305-0.334 0.36c-0.05 0.017-0.103 0.02-0.155 0.01c-0.105-0.024-0.213-0.036-0.321-0.035c0.043 0.251 0.193 0.471 0.411 0.603c0.011 0.006 0.021 0.012 0.031 0.019c0.192 0.139 0.322 0.348 0.362 0.581c0.028 0.253-0.053 0.505-0.224 0.693c-0.036 0.045-0.032 0.062-0.03 0.068c0.027 0.109 0.281 0.29 0.49 0.379c0.056 0.024 0.104 0.064 0.137 0.116l0.65 1.028c0.989 1.062 0.896 1.585 0.796 1.773c-0.042 0.089-0.041 0.137-0.036 0.144c0.066 0.093 0.467 0.147 0.811 0.109c0.029-0.003 0.057-0.002 0.086 0.003c0.507 0.091 1.148 0.265 1.321 0.574c0.118 0.1 0.261 0.166 0.413 0.193c0.318-0.043 0.562 0.004 0.727 0.138c0.11 0.086 0.179 0.215 0.189 0.354c0.001 0.014 0 0.028-0.001 0.043c-0.008 0.039-0.005 0.08 0.008 0.118c0.086 0.028 0.179 0.028 0.266 0.001c0.026-0.007 0.053-0.01 0.08-0.01c0.025-0 0.049 0.003 0.073 0.009c0.973 0.247 1.63 1.701 1.863 2.299l3.986-0.588c0.007-0.03 0.007-0.061-0.002-0.09c-0.004-0.003-0.008-0.005-0.012-0.007c-0.445-0.21-0.461-0.721-0.408-0.962c0.02-0.09 0.081-0.167 0.164-0.206c0.046-0.024 0.088-0.055 0.123-0.093c-0.12-0.258-0.148-0.55-0.08-0.826c0.017-0.065 0.056-0.122 0.109-0.162c0.133-0.09 0.244-0.209 0.324-0.347c-0.393-0.341-0.665-0.801-0.776-1.31l-2.469-2.201c-0.048-0.054-0.078-0.125-0.078-0.203c0-0.167 0.136-0.302 0.302-0.302c0.062 0 0.119 0.019 0.167 0.051Z"/><g fill="none" stroke="currentColor" stroke-width="0.75"><rect x="13" y="8.5" width="5.5" height="4.5" rx="0.44" ry="0.44"/><path d="M14.25 8.5V7.3a1.5 1.5 0 0 1 3 0v1.2"/></g></svg>`,

  noDataSellingIcon: `<svg viewBox="0 0 56 56" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;"><g><g><path d="M10.347,30.974l0,-5.568c0,-1.177 0.555,-2.287 1.497,-2.993l10.8,-8.1c1.326,-0.995 3.164,-0.995 4.49,-0l10.8,8.1l0.005,0.004c0.934,0.71 1.491,1.813 1.491,2.989l0,13.5c0,2.053 -1.689,3.742 -3.742,3.742l-21.6,0c-0.358,0 -0.705,-0.051 -1.033,-0.147c0.588,-0.83 0.915,-1.39 1.073,-1.936l21.56,0c0.91,0 1.658,-0.749 1.658,-1.658l0,-13.5c0,-0.524 -0.252,-1.013 -0.667,-1.33l-10.796,-8.097c-0.588,-0.441 -1.402,-0.441 -1.99,0l-10.8,8.1c-0.417,0.313 -0.663,0.805 -0.663,1.327l-0,4.708c-1.055,0.589 -1.56,0.633 -2.083,0.86Z"/><path d="M37.83,24.527c0.485,-0.308 1.13,-0.165 1.438,0.321c0.308,0.485 0.165,1.13 -0.321,1.438l-12.11,7.695l-0.006,0.004c-1.187,0.744 -2.7,0.744 -3.887,0l-0.006,-0.004l-12.11,-7.695c-0.485,-0.308 -0.629,-0.953 -0.321,-1.438c0.308,-0.485 0.953,-0.629 1.438,-0.321l12.105,7.692c0.511,0.319 1.162,0.319 1.673,-0l12.105,-7.692Z"/></g><g><path d="M28.19,15.691l3.687,-2.765c1.235,-0.926 2.946,-0.926 4.181,-0l10.057,7.543l0.005,0.004c0.87,0.661 1.389,1.688 1.389,2.784l0,12.572c0,1.911 -1.573,3.484 -3.484,3.484l-6.242,0c0.021,-0.034 0.042,-0.068 0.063,-0.103c0.233,-0.387 0.425,-1.033 0.574,-1.837l5.605,0c0.847,0 1.544,-0.697 1.544,-1.544l0,-12.572c0,-0.488 -0.235,-0.944 -0.621,-1.238l-10.054,-7.54c-0.547,-0.411 -1.306,-0.411 -1.853,0l-3.475,2.606c-0.509,-0.64 -0.964,-1.09 -1.377,-1.393Z"/><path d="M38.793,27.029l7.226,-4.592c0.452,-0.287 1.052,-0.153 1.339,0.298c0.287,0.452 0.153,1.052 -0.298,1.339l-8.295,5.271c0.061,-0.956 0.117,-1.698 0.028,-2.317Z"/></g><g><path d="M15.971,35.422c0.115,-0.296 0.107,-0.626 -0.021,-0.917l-1.736,-3.932c-0.266,-0.602 -0.979,-0.878 -1.581,-0.612l-3.932,1.736c-0.291,0.128 -0.519,0.367 -0.633,0.664l-2.665,6.879c-0.285,0.741 0.088,1.586 0.828,1.875l5.2,2.015c0.741,0.285 1.586,-0.088 1.875,-0.828l2.665,-6.879Z" style="fill:none;fill-rule:nonzero;stroke:currentColor;stroke-width:1.2px;"/><path d="M12.21,36.914l-1.968,-0.839c-0.36,-0.153 -0.798,0.054 -0.97,0.458c-0.173,0.405 -0.018,0.864 0.341,1.017l1.312,0.559c0.36,0.153 0.514,0.613 0.341,1.017c-0.173,0.405 -0.611,0.612 -0.97,0.458l-1.968,-0.839m2.577,-2.411l0.307,-0.719m-1.127,2.135l0.189,0.08m-0.949,2.211l0.149,-0.351" style="fill:none;fill-rule:nonzero;stroke:currentColor;stroke-width:1.09px;"/><path d="M12.32,33.702c0.067,0.151 -0.002,0.328 -0.153,0.395c-0.151,0.067 -0.328,-0.002 -0.395,-0.153c-0.067,-0.151 0.002,-0.328 0.153,-0.395c0.151,-0.067 0.328,0.002 0.395,0.153Z" style="stroke:currentColor;stroke-width:1.2px;"/></g><g><path d="M9.867,9.735l36.056,36.056" style="fill:none;stroke:currentColor;stroke-width:4.17px;stroke-miterlimit:1.5;"/><path d="M28,0c15.454,0 28,12.546 28,28c0,15.454 -12.546,28 -28,28c-15.454,0 -28,-12.546 -28,-28c0,-15.454 12.546,-28 28,-28Zm0,4.167c-13.154,0 -23.833,10.679 -23.833,23.833c0,13.154 10.679,23.833 23.833,23.833c13.154,0 23.833,-10.679 23.833,-23.833c0,-13.154 -10.679,-23.833 -23.833,-23.833Z"/></g></g></svg>`,

  noDataSellingIconOutline: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 15v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-6"/><polyline points="1 15 6 11.5 11 15"/><rect x="13" y="2" width="10" height="7" rx="1"/><circle cx="18" cy="5.5" r="2"/><path d="M10 11Q7 7 6 4"/><polyline points="6 7 6 4 9 4"/><path d="M14 13Q17 17 18 20"/><polyline points="18 17 18 20 15 20"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`,

  /** Verified shield with checkmark (heavier stroke for emphasis) */
  shieldVerified: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,

  lock: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,

  /** Lucide lock-keyhole — used in GDPR trust badge EU-circle composition */
  lucideLockKeyhole: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="16" r="1"/><rect width="18" height="12" x="3" y="10" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></g></svg>`,

  // ── Actions / UI ───────────────────────────────────────────────────
  search: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,

  check: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,

  /** Checkmark with stroke-width 2 (used in policy lists) */
  checkBold: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,

  /** X / cross mark (used for "we don't do this" lists) */
  xMark: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,

  ban: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`,

  // ── Concepts ───────────────────────────────────────────────────────
  monitor: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,

  heart: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,

  star: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,

  /** Lucide star — used in GDPR trust badge EU-circle composition */
  lucideStar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"/></svg>`,

  eye: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,

  creditCard: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,

  // ── Carousel / Navigation ───────────────────────────────────────────
  chevronUp: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 15 12 9 18 15"/></svg>`,

  chevronDown: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,

  chevronLeft: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,

  chevronRight: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,

  // ── Feature icons ─────────────────────────────────────────────────
  scan: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></svg>`,

  clock: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,

  list: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,

  lightbulb: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>`,

  mailX: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9"/><polyline points="22 6 12 13 2 6"/><line x1="17" y1="17" x2="22" y2="22"/><line x1="22" y1="17" x2="17" y2="22"/></svg>`,

  filter: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,

  userCircle: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,

  trash: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,

  gift: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,

  code: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,

  magnifyingGlassCode: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path d="m13 13.5l2-2.5l-2-2.5M21 21l-4.3-4.3M9 8.5L7 11l2 2.5"/><circle cx="11" cy="11" r="8"/></g></svg>`,

  cpu: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,

  // ── Email Unsubscriber specifics ───────────────────────────────────
  /** Clock with backward-curving arrow — used for unsubscribe history/audit log */
  history: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><polyline points="3 4 3 9 8 9"/><polyline points="12 8 12 12 15 14"/></svg>`,

  /** Wallet with card slots — used for referral payouts/earnings */
  wallet: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="14" x="3" y="6" rx="2"/><line x1="17" y1="10" x2="21" y2="10"/><line x1="17" y1="14" x2="21" y2="14"/><circle cx="17" cy="12" r="0.75"/></svg>`,

  /** Open-corner brackets — used for transparency value */
  transparent: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4H9"/><path d="M15 4H20V9"/><path d="M4 15V20H9"/><path d="M15 20H20V15"/></svg>`,

  /** User with plus sign — used for "new friend joining" in referral */
  userPlus: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="9" r="3.5"/><path d="M3 21v-1.5a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6V21"/><line x1="20" y1="3" x2="20" y2="9"/><line x1="17" y1="6" x2="23" y2="6"/></svg>`,

  // ── Blog ──────────────────────────────────────────────────────────
  /** Lucide calendar — post meta date */
  calendar: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>`,

  /** Lucide tag — category eyebrow */
  tag: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r="0.5" fill="currentColor"/></svg>`,

  /** Lucide arrow-right — "Read the article" + featured CTA */
  arrowRight: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,

  /** Lucide copy — copy link share button */
  copy: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,

  // ── Social ─────────────────────────────────────────────────────────
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,

  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,

  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
} as const

export type IconName = keyof typeof icons