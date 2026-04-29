document.addEventListener('DOMContentLoaded', () => {
    // Current state
    let currentPeriod = 'Mar18-Apr17';
    
    // DOM Elements
    const elements = {
        periodDate: document.getElementById('reporting-period-date'),
        btnFebMar: document.getElementById('btn-feb-mar'),
        btnMarApr: document.getElementById('btn-mar-apr'),
        summary: {
            leads: document.getElementById('kpi-leads'),
            conversions: document.getElementById('kpi-conversions'),
            revenue: document.getElementById('kpi-revenue'),
            adSpend: document.getElementById('kpi-adSpend'),
            roas: document.getElementById('kpi-roas'),
            cpl: document.getElementById('kpi-cpl'),
            retainer: document.getElementById('kpi-retainer'),
            seoCost: document.getElementById('kpi-seoCost'),
            totalSpend: document.getElementById('kpi-totalSpend'),
            roi: document.getElementById('kpi-roi'),
            cpa: document.getElementById('kpi-cpa')
        },
        funnel: {
            leadQualified: {
                values: document.getElementById('funnel-leadQualified-values'),
                percentage: document.getElementById('funnel-leadQualified-percentage')
            },
            qualifiedVisit: {
                values: document.getElementById('funnel-qualifiedVisit-values'),
                percentage: document.getElementById('funnel-qualifiedVisit-percentage')
            },
            visitSale: {
                values: document.getElementById('funnel-visitSale-values'),
                percentage: document.getElementById('funnel-visitSale-percentage')
            },
            overall: {
                values: document.getElementById('funnel-overall-values'),
                percentage: document.getElementById('funnel-overall-percentage')
            }
        },
        instagram: {
            totalViews: document.getElementById('insta-totalViews'),
            accountsReached: document.getElementById('insta-accountsReached'),
            interactions: document.getElementById('insta-interactions'),
            profileVisits: document.getElementById('insta-profileVisits'),
            totalFollowers: document.getElementById('insta-totalFollowers'),
            tbody: document.getElementById('insta-tbody'),
            desc: document.getElementById('insta-desc')
        },
        facebook: {
            totalViews: document.getElementById('fb-totalViews'),
            uniqueViewers: document.getElementById('fb-uniqueViewers'),
            engagement: document.getElementById('fb-engagement'),
            netFollowers: document.getElementById('fb-netFollowers'),
            totalFollowers: document.getElementById('fb-totalFollowers'),
            tbody: document.getElementById('fb-tbody'),
            desc: document.getElementById('fb-desc')
        },
        metaAds: {
            awarenessTbody: document.getElementById('awareness-tbody'),
            leadGenTbody: document.getElementById('leadGen-tbody'),
            desc: document.getElementById('meta-ads-desc')
        }
    };

    // Functions to update the UI
    function updateUI(periodKey) {
        console.log('Updating UI for period:', periodKey);
        const data = reportData[periodKey];
        if (!data) return;

        // Update Period Label
        elements.periodDate.textContent = data.periodLabel;

        const periodTextShort = (periodKey === 'Feb18-Mar17') ? 'Feb – Mar' : 'Mar – Apr';
        if (elements.instagram.desc) elements.instagram.desc.textContent = `Organic post-level metrics · ${periodTextShort}`;
        if (elements.facebook.desc) elements.facebook.desc.textContent = `Organic post-level metrics · ${periodTextShort}`;

        const metaAdsPeriodText = (periodKey === 'Feb18-Mar17') ? 'Feb 18 – Mar 17' : 'Mar 18 – Apr 17';
        const awarenessTab = document.querySelector('.sub-tab-btn[data-target="awareness"]');
        const isAwarenessActive = awarenessTab && awarenessTab.classList.contains('active');
        
        if (elements.metaAds.desc) {
            if (isAwarenessActive) {
                elements.metaAds.desc.textContent = `Awareness Campaign Performance · ${metaAdsPeriodText}`;
            } else {
                const adSetsText = data.metaAds.leadGeneration.length - 1;
                elements.metaAds.desc.textContent = `Lead Generation Campaign Performance · ${adSetsText} ad sets · ${metaAdsPeriodText}`;
            }
        }

        // Update Summary (Top Metrics)
        Object.keys(elements.summary).forEach(key => {
            elements.summary[key].textContent = data.summary[key] || '--';
        });

        // Update Funnel
        Object.keys(elements.funnel).forEach(key => {
            elements.funnel[key].values.textContent = data.funnel[key].values;
            elements.funnel[key].percentage.textContent = data.funnel[key].percentage;
        });

        // Update Facebook Cards
        const fb = data.facebook?.cards;
        if (fb) {
            elements.facebook.totalViews.textContent = fb.totalViews;
            elements.facebook.uniqueViewers.textContent = fb.uniqueViewers;
            elements.facebook.engagement.textContent = fb.engagement;
            elements.facebook.netFollowers.textContent = fb.netFollowers;
            elements.facebook.totalFollowers.textContent = fb.totalFollowers;
        }

        // Update Facebook Table
        if (data.facebook?.table) {
            elements.facebook.tbody.innerHTML = data.facebook.table.map(row => `
                <tr>
                    <td class="content-name-col">
                        <span class="content-title">${row.name}</span>
                        <span class="content-date">${row.date}</span>
                    </td>
                    <td class="right-align">${row.views}</td>
                    <td class="right-align">${row.interactions}</td>
                    <td class="right-align">${row.engagements}</td>
                    <td class="right-align">${row.reach}</td>
                    <td class="right-align">${row.followers}</td>
                    <td class="right-align"><a href="${row.link}" class="external-link" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></td>
                </tr>
            `).join('');
        }

        // Update Instagram Cards
        const insta = data.instagram?.cards;
        if (insta) {
            elements.instagram.totalViews.textContent = insta.totalViews;
            elements.instagram.accountsReached.textContent = insta.accountsReached;
            elements.instagram.interactions.textContent = insta.interactions;
            elements.instagram.profileVisits.textContent = insta.profileVisits;
            elements.instagram.totalFollowers.textContent = insta.totalFollowers;
        }

        // Update Instagram Table
        if (data.instagram?.table) {
            elements.instagram.tbody.innerHTML = data.instagram.table.map(row => `
                <tr>
                    <td class="content-name-col">
                        <span class="content-title">${row.name}</span>
                        <span class="content-date">${row.date}</span>
                    </td>
                    <td class="right-align">${row.views}</td>
                    <td class="right-align">${row.interactions}</td>
                    <td class="right-align">${row.reach}</td>
                    <td class="right-align">${row.likesAndReactions}</td>
                    <td class="right-align">${row.shares}</td>
                    <td class="right-align">${row.saves}</td>
                    <td class="right-align"><a href="${row.link}" class="external-link" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></td>
                </tr>
            `).join('');
        }

        // Update Meta Ads Awareness Table
        elements.metaAds.awarenessTbody.innerHTML = data.metaAds.awareness.map(row => `
            <tr class="${row.name === 'Total' ? 'total-row' : ''}">
                <td>${row.name}</td>
                <td class="right-align">${row.reach}</td>
                <td class="right-align">${row.impressions}</td>
                <td class="right-align">${row.amount}</td>
                <td class="right-align">${row.cpm}</td>
            </tr>
        `).join('');

        // Update Meta Ads Lead Gen Table
        elements.metaAds.leadGenTbody.innerHTML = data.metaAds.leadGeneration.map(row => `
            <tr class="${row.name === 'Total' ? 'total-row' : ''}">
                <td>${row.name}</td>
                <td class="right-align">${row.leads}</td>
                <td class="right-align">${row.reach}</td>
                <td class="right-align">${row.impressions}</td>
                <td class="right-align">${row.amount}</td>
                <td class="right-align">${row.cpm}</td>
            </tr>
        `).join('');
    }

    // Event Listeners for Period Toggle
    elements.btnFebMar.addEventListener('click', () => {
        elements.btnFebMar.classList.add('active');
        elements.btnMarApr.classList.remove('active');
        currentPeriod = 'Feb18-Mar17';
        updateUI(currentPeriod);
    });

    elements.btnMarApr.addEventListener('click', () => {
        elements.btnMarApr.classList.add('active');
        elements.btnFebMar.classList.remove('active');
        currentPeriod = 'Mar18-Apr17';
        updateUI(currentPeriod);
    });

    // Event Listeners for Main Tabs (Meta Ads, Instagram, Facebook)
    const mainTabBtns = document.querySelectorAll('.main-tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    mainTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            mainTabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = `tab-${btn.dataset.target}`;
            const targetEl = document.getElementById(targetId);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    // Event Listeners for Meta Ads Sub Tabs (Awareness, Lead Gen)
    const subTabBtns = document.querySelectorAll('.sub-tab-btn');
    const metaAdsTab = document.getElementById('tab-meta-ads');
    if (metaAdsTab) {
        const metaAdsTableContainers = metaAdsTab.querySelectorAll('.table-container');

        subTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active from all Meta Ads sub tabs and table containers
                subTabBtns.forEach(b => b.classList.remove('active'));
                metaAdsTableContainers.forEach(tc => tc.classList.remove('active'));

                // Add active to clicked
                btn.classList.add('active');
                const targetId = `table-${btn.dataset.target}`;
                const targetEl = document.getElementById(targetId);
                if (targetEl) targetEl.classList.add('active');

                // Update description
                const periodText = (currentPeriod === 'Feb18-Mar17') ? 'Feb 18 – Mar 17' : 'Mar 18 – Apr 17';
                if (btn.dataset.target === 'awareness') {
                    if (elements.metaAds.desc) elements.metaAds.desc.textContent = `Awareness Campaign Performance · ${periodText}`;
                } else {
                    const adSetsText = reportData[currentPeriod].metaAds.leadGeneration.length - 1; // Subtract 1 for "Total" row
                    if (elements.metaAds.desc) elements.metaAds.desc.textContent = `Lead Generation Campaign Performance · ${adSetsText} ad sets · ${periodText}`;
                }
            });
        });
    }

    // Initialize UI
    updateUI(currentPeriod);
});
