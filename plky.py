import webbrowser
from threading import Timer
from flask import Flask, render_template, request

from jinja2 import Environment
from jinja2 import FileSystemLoader
# import pdfkit

app = Flask(__name__)
products_weights = {'80.60.250': 10.77,
                    '15.62.1000': 19.75,
                    '30.06.100': 0.9,
                    '80.60.500': 21.54,
                    '28.08.500': 1.78,
                    '28,06.500': 1.06,
                    '10.19.04.100': 1.7,
                    '10.19.03.100': 1.7,
                    '80.82.250': 19.100,
                    '001.21.42.20': 2.300,
                    '002.21.42.20': 0.700,
                    '30.08.100': 1.2,
                    '003.15.30': 0.700,
                    '002.15.20': 0.140,
                    '001.15.20': 0.400,
                    '003.21.42': 2.300,
                    '001.21.17.10': 1.100,
                    '007.20.4': 0.470,
                    '002.15.44': 0.460,
                    '007.25.5': 0.480,
                    '93.21.300': 0.031,
                    '93.20.200': 0.033,
                    '93.08.200': 0.030,
                    '93.01.300': 0.034,
                    '93.02.200': 0.036,
                    '21.42.01.1000': 14.300,
                    '19.27.01.1000': 5.400}

@app.route('/', methods=['GET'])
def home():
    return render_template('home.html', products_weights=products_weights)


@app.route('/generate', methods=['POST'])
def generate():
    data = request.data
    form = request.form
    product1 = request.form.getlist('product[0][]')
    amount1 = request.form.getlist('amount[0][]')
    product2 = request.form.getlist('product[1][]')
    amount2 = request.form.getlist('amount[1][]')

    template_vars = {
        'product1': product1,
        'amount1': amount1
    }

    palette_iter = 0
    palette_dict = {}
    while True:
        if request.form.getlist(f'product[{palette_iter}][]'):
            a = f'product[{palette_iter}][]'
            b = f'amount[{palette_iter}][]'
            c = request.form.getlist(a)
            d = request.form.getlist(b)
            ptw = request.form.get(f"palette_true_weight[{palette_iter}]['palette_true_weight']")
            pw = 0
            piw = []
            ms = []
            for i, e in enumerate(c):
                if e != '':
                    q = d[i]
                    w = products_weights[e]
                    piw.append(w)
                    m = w * int(q)
                    ms.append(m)
                    pw += m
            palette_dict[palette_iter] = {'pw': pw, 'items': c, 'quantities': d, 'piw': piw, 'ptw': ptw, 'ms': ms}
            palette_iter += 1
        else:
            break
    print(palette_dict)
    for key, value in palette_dict.items():
        print(key)
        print(value)
        ms_percs = []
        wns = []
        wbs = []
        for k, v in enumerate(value['ms']):
            print(k)
            print(v)
            ms_perc = v / value['pw']
            wn = ms_perc * (int(value['ptw']) - 20)
            wb = ms_perc * int(value['ptw'])
            ms_percs.append(ms_perc)
            wns.append(wn)
            wbs.append(wb)
        palette_dict[key]['ms_percs'] = ms_percs
        palette_dict[key]['wns'] = wns
        palette_dict[key]['wbs'] = wbs
    # env = Environment(loader=FileSystemLoader('templates'))
    # template = env.get_template('generate.html')
    # html_out = template.render(palette_dict = palette_dict)
    # path_wkhtmltopdf = r'C:\wkhtmltopdf\bin\wkhtmltopdf.exe'
    # config = pdfkit.configuration(wkhtmltopdf=path_wkhtmltopdf)
    # file_content = pdfkit.from_string(
    #     html_out,
    #     False,
    #     configuration=config,
    # )
    # with open('generate.pdf', 'wb+') as file:
    #     file.write(file_content)

    return render_template('generate.html', palette_dict = palette_dict)
    # return render_template('generate.html', product1=product1, amount1=amount1)


def open_browser():
    webbrowser.open_new("http://127.0.0.1:5000")


if __name__ == '__main__':
    # Timer(1, open_browser).start()
    app.run(debug=True)
