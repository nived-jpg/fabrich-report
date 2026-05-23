document.addEventListener('DOMContentLoaded', () => {
    // Current state
    let currentPeriod = 'Mar18-Apr17';
    
    // DOM Elements
    const elements = {
        periodDate: document.getElementById('reporting-period-date'),
        btnFebMar: document.getElementById('btn-feb-mar'),
        btnMarApr: document.getElementById('btn-mar-apr'),
        btnAprMay: document.getElementById('btn-apr-may'),
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

        const periodTextShort = (periodKey === 'Feb18-Mar17') ? 'Feb – Mar' : (periodKey === 'Apr18-May17' ? 'Apr – May' : 'Mar – Apr');
        if (elements.instagram.desc) elements.instagram.desc.textContent = `Organic post-level metrics · ${periodTextShort}`;
        if (elements.facebook.desc) elements.facebook.desc.textContent = `Organic post-level metrics · ${periodTextShort}`;

        const metaAdsPeriodText = (periodKey === 'Feb18-Mar17') ? 'Feb 18 – Mar 17' : (periodKey === 'Apr18-May17' ? 'Apr 18 – May 17' : 'Mar 18 – Apr 17');
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
                    <td class="content-name-col" data-label="Content">
                        <span class="content-title">${row.name}</span>
                        <span class="content-date">${row.date}</span>
                    </td>
                    <td class="right-align" data-label="Views">${row.views}</td>
                    <td class="right-align" data-label="Interactions">${row.interactions}</td>
                    <td class="right-align" data-label="Engagements">${row.engagements}</td>
                    <td class="right-align" data-label="Reach">${row.reach}</td>
                    <td class="right-align" data-label="Followers">${row.followers}</td>
                    <td class="right-align" data-label="Link"><a href="${row.link}" class="external-link" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></td>
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
                    <td class="content-name-col" data-label="Content">
                        <span class="content-title">${row.name}</span>
                        <span class="content-date">${row.date}</span>
                    </td>
                    <td class="right-align" data-label="Views">${row.views}</td>
                    <td class="right-align" data-label="Interactions">${row.interactions}</td>
                    <td class="right-align" data-label="Reach">${row.reach}</td>
                    <td class="right-align" data-label="Likes">${row.likesAndReactions}</td>
                    <td class="right-align" data-label="Shares">${row.shares}</td>
                    <td class="right-align" data-label="Saves">${row.saves}</td>
                    <td class="right-align" data-label="Link"><a href="${row.link}" class="external-link" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></td>
                </tr>
            `).join('');
        }

        // Update Meta Ads Awareness Table
        elements.metaAds.awarenessTbody.innerHTML = data.metaAds.awareness.map(row => `
            <tr class="${row.name === 'Total' ? 'total-row' : ''}">
                <td data-label="Ad Name">${row.name}</td>
                <td class="right-align" data-label="Reach">${row.reach}</td>
                <td class="right-align" data-label="Impressions">${row.impressions}</td>
                <td class="right-align" data-label="Spend">${row.amount}</td>
                <td class="right-align" data-label="CPM">${row.cpm}</td>
            </tr>
        `).join('');

        // Update Meta Ads Lead Gen Table
        elements.metaAds.leadGenTbody.innerHTML = data.metaAds.leadGeneration.map(row => `
            <tr class="${row.name === 'Total' ? 'total-row' : ''}">
                <td data-label="Ad Name">${row.name}</td>
                <td class="right-align" data-label="Leads">${row.leads}</td>
                <td class="right-align" data-label="Reach">${row.reach}</td>
                <td class="right-align" data-label="Impressions">${row.impressions}</td>
                <td class="right-align" data-label="Spend">${row.amount}</td>
                <td class="right-align" data-label="CPM">${row.cpm}</td>
            </tr>
        `).join('');
    }

    // Event Listeners for Period Toggle
    elements.btnFebMar.addEventListener('click', () => {
        elements.btnFebMar.classList.add('active');
        elements.btnMarApr.classList.remove('active');
        elements.btnAprMay.classList.remove('active');
        currentPeriod = 'Feb18-Mar17';
        updateUI(currentPeriod);
    });

    elements.btnMarApr.addEventListener('click', () => {
        elements.btnMarApr.classList.add('active');
        elements.btnFebMar.classList.remove('active');
        elements.btnAprMay.classList.remove('active');
        currentPeriod = 'Mar18-Apr17';
        updateUI(currentPeriod);
    });

    elements.btnAprMay.addEventListener('click', () => {
        elements.btnAprMay.classList.add('active');
        elements.btnFebMar.classList.remove('active');
        elements.btnMarApr.classList.remove('active');
        currentPeriod = 'Apr18-May17';
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
                const periodText = (currentPeriod === 'Feb18-Mar17') ? 'Feb 18 – Mar 17' : (currentPeriod === 'Apr18-May17' ? 'Apr 18 – May 17' : 'Mar 18 – Apr 17');
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

    // ============================================================
    // Mobile Accordion Logic
    // ============================================================
    const initAccordions = () => {
        const cards = document.querySelectorAll('.seo-activity-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    card.classList.toggle('active');
                }
            });
        });
    };
    initAccordions();

    // ============================================================
    // SEO Charts
    // ============================================================
    // ============================================================
    // SEO Charts (Lazy Loaded)
    // ============================================================
    const initSeoCharts = () => {
        const isMobile = window.innerWidth <= 768;

        // Generate 28 day labels
        const days = [];
        for (let i = 1; i <= 28; i++) {
            days.push(`Apr ${i}`);
        }

        // Simulated data
        const clicksData   = [3,4,5,4,6,5,7,6,8,7,9,8,7,6,8,7,9,8,10,9,8,7,9,8,10,9,8,7];
        const impData      = [280,295,310,300,340,320,360,340,390,370,410,390,370,350,390,370,410,390,440,420,400,380,420,400,445,425,410,390];
        const ctrData      = [1.07,1.36,1.61,1.33,1.76,1.56,1.94,1.76,2.05,1.89,2.19,2.05,1.89,1.71,2.05,1.89,2.19,2.05,2.27,2.14,2.0,1.84,2.14,2.0,2.25,2.12,1.95,1.79];
        const posData      = [11.2,10.8,10.5,10.9,10.4,10.7,10.1,10.4,9.9,10.1,9.7,9.9,10.2,10.5,9.9,10.1,9.7,9.9,9.4,9.6,9.9,10.1,9.6,9.8,9.2,9.4,9.6,9.8];

        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: { family: "'Inter', sans-serif", size: isMobile ? 10 : 12 },
                        usePointStyle: true,
                        pointStyleWidth: 8,
                        padding: isMobile ? 10 : 18,
                        color: '#555'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255,255,255,0.97)',
                    titleColor: '#111',
                    bodyColor: '#555',
                    borderColor: '#E6E4DD',
                    borderWidth: 1,
                    padding: 10,
                    titleFont: { family: "'Inter', sans-serif", weight: '600' },
                    bodyFont:  { family: "'Inter', sans-serif" }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(0,0,0,0.04)' },
                    ticks: {
                        font: { family: "'Inter', sans-serif", size: isMobile ? 9 : 11 },
                        color: '#999',
                        maxTicksLimit: isMobile ? 4 : 7,
                        maxRotation: 0
                    }
                }
            }
        };

        // Multi-line SEO Performance Chart
        const perfCtx = document.getElementById('seoPerformanceChart');
        if (perfCtx) {
            new Chart(perfCtx, {
                type: 'line',
                data: {
                    labels: days,
                    datasets: [
                        { label: 'Clicks', data: clicksData, borderColor: '#2F62E8', backgroundColor: 'rgba(47,98,232,0.08)', borderWidth: 2.5, pointRadius: 0, pointHoverRadius: 5, tension: 0.45, fill: true, yAxisID: 'yLeft' },
                        { label: 'Impressions', data: impData, borderColor: '#E53E87', backgroundColor: 'transparent', borderWidth: 2, pointRadius: 0, pointHoverRadius: 5, tension: 0.45, fill: false, yAxisID: 'yRight' },
                        { label: isMobile ? 'CTR' : 'CTR (%)', data: ctrData, borderColor: '#16A34A', backgroundColor: 'transparent', borderWidth: 2, pointRadius: 0, pointHoverRadius: 5, tension: 0.45, fill: false, borderDash: [5, 3], yAxisID: 'yLeft' },
                        { label: isMobile ? 'Pos' : 'Position', data: posData, borderColor: '#D97706', backgroundColor: 'transparent', borderWidth: 2, pointRadius: 0, pointHoverRadius: 5, tension: 0.45, fill: false, borderDash: [3, 3], yAxisID: 'yLeft' }
                    ]
                },
                options: {
                    ...commonOptions,
                    scales: {
                        ...commonOptions.scales,
                        yLeft: {
                            type: 'linear',
                            position: 'left',
                            grid: { color: 'rgba(0,0,0,0.04)' },
                            ticks: { font: { size: isMobile ? 9 : 11 }, color: '#999' },
                            title: { display: !isMobile, text: 'Clicks / CTR / Position', font: { size: 11 }, color: '#aaa' }
                        },
                        yRight: {
                            type: 'linear',
                            position: 'right',
                            grid: { drawOnChartArea: false },
                            ticks: { font: { size: isMobile ? 9 : 11 }, color: '#999' },
                            title: { display: !isMobile, text: 'Impressions', font: { size: 11 }, color: '#aaa' }
                        }
                    }
                }
            });
        }

        // Click Trend Mini Chart
        const trendCtx = document.getElementById('seoClickTrendChart');
        if (trendCtx) {
            const trendData = clicksData.map((v, i) => +(v * (1 + i * 0.004)).toFixed(1));
            new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: days,
                    datasets: [{ label: 'Clicks', data: trendData, borderColor: '#2F62E8', backgroundColor: 'rgba(47,98,232,0.07)', borderWidth: 2, pointRadius: 0, pointHoverRadius: 4, tension: 0.5, fill: true }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { padding: 8 } },
                    scales: {
                        x: { grid: { display: false }, ticks: { font: { size: 9 }, color: '#bbb', maxTicksLimit: 5 } },
                        y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 9 }, color: '#bbb' } }
                    }
                }
            });
        }
    };

    // Use IntersectionObserver to lazy load charts
    const chartObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initSeoCharts();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const seoSection = document.querySelector('.seo-section');
    if (seoSection) {
        chartObserver.observe(seoSection);
    }
});
