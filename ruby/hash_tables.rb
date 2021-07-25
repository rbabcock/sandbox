def remove_duplicates(list)
    set = {}
    list.each do |el|
        set[el] = 1
    end
    set.keys
end 

def get_freq(str)
    freq = Hash.new(0)
    str.each_char do |char|
        freq[chr] += 1
    end
    freq
end

def check_anagram(str1, str2) 
    return get_freq(str1) == get_freq(str2)
end

array = [45,2,3,4,5,5,6,7,1,8,9,0].sort()

puts remove_duplicates(array)