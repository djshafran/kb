def avg_color(colors):
    r, g, b = 0, 0, 0

    for color in colors:
        r += int(color[1:3], 16)
        g += int(color[3:5], 16)
        b += int(color[5:7], 16)

    r //= len(colors)
    g //= len(colors)
    b //= len(colors)

    return f"#{r:02X}{g:02X}{b:02X}"

def generate_html(colors, groups):
    html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Colors Table</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
        }
        td {
            padding: 30px 0px;
            border: 0px;
            text-align: center;
            font-family: Arial, sans-serif;
            color: white;
            font-weight: bold;
        }
    </style>
</head>
<body>
<table border="1">
    <tr>
        <th colspan="12">Colors Table</th>
    </tr>
"""

    for name, indices_list in groups.items():
        for indices in indices_list:
            group_colors = [colors[i] for i in indices]
            avg_col = avg_color(group_colors)
            colspan_value = len(group_colors)
            html += f'    <tr>\n        <td style="background-color: {avg_col};" colspan="{colspan_value}">{avg_col}</td>\n    </tr>\n'

    html += """</table>
</body>
</html>"""

    return html

def main():
    colors = [
        "#5E2979", "#9B1854", "#C1191F", "#D6441D",
        "#F8991B", "#FECB10", "#FCE50B", "#80BD00",
        "#12A04A", "#1D71AC", "#014A97", "#332D85"
    ]

    # optimized_colors = [
    # colors = [
    #     "#602980", "#9C1A55", "#C12020", "#D75020",
    #     "#FA9C20", "#FFCC20", "#FFEA20", "#80BE00",
    #     "#12A050", "#1E72B0", "#0150A0", "#342D90"
    # ]

    groups = {
        "Четверки": [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]],
        "Двойки": [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11]],
        "Исходная последовательность": [[i] for i in range(12)],
        "Тройки": [[11, 0, 1], [2, 3, 4], [5, 6, 7], [8, 9, 10]],
        "Шестерки": [[11, 0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10]]
    }

    html_content = generate_html(colors, groups)
    with open("colors_table.html", "w") as f:
        f.write(html_content)

if __name__ == "__main__":
    main()
