from playwright.sync_api import sync_playwright
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import threading,functools
ui=(Path(__file__).resolve().parents[1]/'Preview'/'BellhavenGameUI.html').resolve()
server=ThreadingHTTPServer(('127.0.0.1',0),functools.partial(SimpleHTTPRequestHandler,directory=str(ui.parent)))
threading.Thread(target=server.serve_forever,daemon=True).start()
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':1512,'height':920},device_scale_factor=1)
 errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.set_content(ui.read_text(),wait_until="load");page.wait_for_timeout(250)
 assert page.locator('#inventoryScreen').is_visible()
 assert 'Carried weight' in page.locator('#stats').inner_text()
 page.screenshot(path=str(ui.parent/'inventory_ui_preview.png'),full_page=True)
 page.locator('[data-page="dealer"]').click();page.wait_for_timeout(120)
 assert page.locator('#dealerScreen').is_visible()
 # Camila asks 2 oxy + 1 alprazolam.
 page.locator('[data-add="oxycodone"]').click(click_count=2,delay=45)
 page.locator('[data-add="alprazolam"]').click()
 assert page.locator('#completeDeal').is_enabled()
 page.screenshot(path=str(ui.parent/'dealer_ui_preview.png'),full_page=True)
 page.locator('#completeDeal').click();page.wait_for_timeout(120)
 assert 'Exchange completed' in page.locator('#toast').inner_text()
 page.locator('[data-page="clients"]').click()
 assert page.locator('#clientsGrid .client-card').count()>=3
 page.locator('#phoneButton').click()
 assert page.locator('#phoneShade').is_visible()
 assert page.locator('#phoneClasses button').first.inner_text()=='All Classes'
 page.locator('#phoneEntries [data-inspect]').first.click(button='right')
 assert page.locator('#detailsBackdrop').is_visible()
 page.locator('#closeDetails').click()
 page.screenshot(path=str(ui.parent/'phone_with_classes_preview.png'))
 page.locator('#closePhone').click()
 page.locator('[data-page="lab"]').click();page.wait_for_timeout(100)
 assert page.locator('#labScreen').is_visible()
 assert page.locator('#labClassSelect').input_value()=='All Classes'
 assert page.locator('#labDrugSelect optgroup').count()==4
 prev=page.locator('#labDrugSelect option:checked').get_attribute('value')
 assert prev=='codeine' or prev=='morphine' or bool(prev)
 page.locator('#labDuplicate').click();assert page.locator('#labDrugSelect').input_value().endswith('-copy')
 assert page.locator('#labCurve svg').count()==1
 page.screenshot(path=str(ui.parent/'tolerance_lab_preview.png'),full_page=True)
 assert not errors,errors
 print('PASS: Inventory, dealer exchange, clients, class-first phone, right-click details, editable cloneable drug lab, screenshots')
 browser.close()
