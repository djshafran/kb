def average_colors(colors):
    r, g, b = 0, 0, 0

    for color in colors:
        r += int(color[1:3], 16)
        g += int(color[3:5], 16)
        b += int(color[5:7], 16)

    r //= len(colors)
    g //= len(colors)
    b //= len(colors)

    return f"#{r:02X}{g:02X}{b:02X}"

def main():
    # Приглушенные радужные цвета
    colors = [
        "#A47CB2",  # i
        "#C77D8F",  # ii
        "#D37B75",  # iii
        "#F2A49F",  # iv
        "#F3B897",  # v
        "#FFECB5",  # vi
        "#F4EB9E",  # vii
        "#BEC997",  # iix
        "#7FD5A6",  # ix
        "#92B7D8",  # x
        "#75A2C7",  # xi
        "#6C7ABD",  # xii
    ]

    groups = {
        "Четверки": [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]],
        "Двойки": [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11]],
        "Тройки": [[11, 0, 1], [2, 3, 4], [5, 6, 7], [8, 9, 10]],
        "Шестерки": [[11, 0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10]]
    }

    derived_colors = {}

    for name, group in groups.items():
        derived_colors[name] = [average_colors([colors[i] for i in subgroup]) for subgroup in group]

    print("Исходные цвета:")
    for color in colors:
        print(color)

    for name, derived_group in derived_colors.items():
        print(f"\n{name}:")
        for color in derived_group:
            print(color)

if __name__ == "__main__":
    main()