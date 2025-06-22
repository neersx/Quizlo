public static class EnumExtensions
{
    public static int ToEnumInt<TEnum>(this string value) where TEnum : struct, Enum
    {
        if (Enum.TryParse<TEnum>(value, ignoreCase: true, out var result))
        {
            return Convert.ToInt32(result);
        }
        throw new ArgumentException($"The value '{value}' is not a valid member of the enum '{typeof(TEnum).Name}'.");
    }
}
